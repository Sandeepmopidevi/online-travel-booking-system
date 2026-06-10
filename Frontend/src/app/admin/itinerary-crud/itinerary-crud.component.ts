import { Component, OnInit } from '@angular/core';
import { ItineraryService, Itinerary, ItineraryDTO } from '../../services/itinerary.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { PackageService } from '../../services/package.service';

@Component({
  standalone: false,
  selector: 'app-itinerary-crud',
  templateUrl: './itinerary-crud.component.html',
  styleUrls: ['./itinerary-crud.component.css']
})
export class ItineraryCrudComponent implements OnInit {
  itineraries: Itinerary[] = [];
  filteredItineraries: Itinerary[] = [];
  isLoading = false;
  isEditing = false;
  editingId: number | null = null;
  searchUserId: string = '';
  itineraryForm: ItineraryDTO = this.blankItinerary();

  // For create form
  createForm: ItineraryDTO = this.blankItinerary();
  isCreating = false;
  showCreateForm = false; // for "Want to Create?" option

  // User role and userId for access control
  userRole: string | null = null;
  userId: number | null = null;

  // For dropdowns
  users: any[] = [];
  packages: any[] = [];

  constructor(
    private itineraryService: ItineraryService,
    private toastr: ToastrService,
    private authService: AuthService,
    private http: HttpClient,
    private packageService: PackageService
  ) {}

  ngOnInit(): void {
    this.userRole = this.authService.getUserRole();
    // Load only Traveller users for dropdown
    this.fetchTravellerUsers();
    this.fetchPackages();

    // If TravelAgent, get their userId for filtering
    if (this.userRole === 'TravelAgent') {
      this.authService.getUserIdByEmail().subscribe({
        next: (id) => {
          this.userId = id;
          this.loadItineraries();
        },
        error: () => {
          this.toastr.error('Failed to fetch user details.', 'Error');
          this.loadItineraries();
        }
      });
    } else {
      this.loadItineraries();
    }
  }

  blankItinerary(): ItineraryDTO {
    return {
      customizationDetails: '',
      userID: 0,
      packageID: 0
    };
  }

  // Fetch only users with role Traveller
  fetchTravellerUsers() {
    const headers = this.authService.getAuthHeaders();
    this.http.get<any[]>('https://localhost:7193/api/Users/GetUsers', { headers }).subscribe({
      next: data => {
        // If user.role is a string
        this.users = data.filter(user => user.role === 'Traveller');
        // If user.roles is an array, use:
        // this.users = data.filter(user => Array.isArray(user.roles) && user.roles.includes('Traveller'));
      },
      error: () => { this.users = []; }
    });
  }

  fetchPackages() {
    this.packageService.getPackages().subscribe({
      next: data => { this.packages = data; },
      error: () => { this.packages = []; }
    });
  }

  getUserName(userId: number): string {
    const user = this.users.find(u => u.userId === userId);
    return user ? `${user.name} (${user.email})` : userId + '';
  }

  getPackageName(packageId: number): string {
    const pkg = this.packages.find(p => p.packageID === packageId);
    return pkg ? pkg.name : packageId + '';
  }

  loadItineraries() {
    this.isLoading = true;
    this.itineraryService.getItineraries().subscribe({
      next: (data) => {
        // If TravelAgent, only show their own itineraries
        if (this.userRole === 'TravelAgent' && this.userId) {
          this.itineraries = data.filter(it => it.userID === this.userId);
        } else {
          this.itineraries = data;
        }
        this.filteredItineraries = this.itineraries;
        this.isLoading = false;
      },
      error: () => {
        this.toastr.error('Failed to load itineraries.', 'Error');
        this.isLoading = false;
      }
    });
  }

  searchByUserId() {
    if (!this.searchUserId.trim()) {
      this.filteredItineraries = this.itineraries;
      return;
    }
    const userId = parseInt(this.searchUserId, 10);
    if (isNaN(userId)) {
      this.toastr.warning('Invalid User ID', 'Warning');
      return;
    }
    this.isLoading = true;
    this.itineraryService.searchItineraries(userId).subscribe({
      next: (data) => {
        // If TravelAgent, only show their own itineraries
        if (this.userRole === 'TravelAgent' && this.userId) {
          this.filteredItineraries = data.filter(it => it.userID === this.userId);
        } else {
          this.filteredItineraries = data;
        }
        this.isLoading = false;
      },
      error: () => {
        this.toastr.error('Failed to search itineraries.', 'Error');
        this.isLoading = false;
      }
    });
  }

  startEdit(itinerary: Itinerary) {
    // Prevent editing if not allowed
    if (this.userRole === 'TravelAgent' && itinerary.userID !== this.userId) {
      this.toastr.warning('You can only edit your own itineraries.', 'Access Denied');
      return;
    }
    this.isEditing = true;
    this.editingId = itinerary.itineraryID;
    this.itineraryForm = {
      customizationDetails: itinerary.customizationDetails,
      userID: itinerary.userID,
      packageID: itinerary.packageID
    };
  }

  cancelEdit() {
    this.isEditing = false;
    this.editingId = null;
    this.itineraryForm = this.blankItinerary();
  }

  submitEdit() {
    if (this.editingId == null) return;
    // Prevent editing if not allowed
    if (this.userRole === 'TravelAgent' && this.itineraryForm.userID !== this.userId) {
      this.toastr.warning('You can only edit your own itineraries.', 'Access Denied');
      return;
    }
    this.itineraryService.updateItinerary(this.editingId, this.itineraryForm).subscribe({
      next: () => {
        this.toastr.success('Itinerary updated successfully.', 'Success');
        this.loadItineraries();
        this.cancelEdit();
      },
      error: () => {
        this.toastr.error('Failed to update itinerary.', 'Error');
      }
    });
  }

  confirmDelete(id: number) {
    // Find the itinerary for access check
    const itinerary = this.itineraries.find(it => it.itineraryID === id);
    if (this.userRole === 'TravelAgent' && itinerary && itinerary.userID !== this.userId) {
      this.toastr.warning('You can only delete your own itineraries.', 'Access Denied');
      return;
    }
    Swal.fire({
      title: 'Are you sure?',
      text: 'This itinerary will be permanently deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.itineraryService.deleteItinerary(id).subscribe({
          next: () => {
            this.toastr.success('Itinerary deleted.', 'Success');
            this.loadItineraries();
          },
          error: () => {
            this.toastr.error('Failed to delete itinerary.', 'Error');
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.toastr.info('Deletion cancelled.', 'Info');
      }
    });
  }

  // Admin or travel agent create
  submitCreate() {
    // For TravelAgent: only allow creating for their own userID
    if (this.userRole === 'TravelAgent' && this.userId) {
      this.createForm.userID = this.userId;
    }
    if (
      !this.createForm.customizationDetails.trim() ||
      !this.createForm.userID ||
      !this.createForm.packageID
    ) {
      this.toastr.warning('Please fill all create fields!', 'Validation');
      return;
    }
    this.isCreating = true;
    this.itineraryService.createItinerary(this.createForm).subscribe({
      next: () => {
        this.toastr.success('Itinerary created successfully!', 'Success');
        this.createForm = this.blankItinerary();
        this.showCreateForm = false;
        this.loadItineraries();
        this.isCreating = false;
      },
      error: () => {
        this.toastr.error('Failed to create itinerary.', 'Error');
        this.isCreating = false;
      }
    });
  }

  openCreateForm() {
    this.showCreateForm = true;
    this.createForm = this.blankItinerary();
    // For TravelAgent, pre-fill their userID
    if (this.userRole === 'TravelAgent' && this.userId) {
      this.createForm.userID = this.userId;
    }
  }

  cancelCreateForm() {
    this.showCreateForm = false;
    this.createForm = this.blankItinerary();
  }
}