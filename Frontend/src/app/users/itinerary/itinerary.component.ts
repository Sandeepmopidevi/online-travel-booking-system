import { Component, OnInit } from '@angular/core';
import { ItineraryService, Itinerary, ItineraryDTO } from '../../services/itinerary.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { PackageService } from '../../services/package.service';
import { Package } from '../../models/package.model';

@Component({
  standalone: false,
  selector: 'app-itinerary',
  templateUrl: './itinerary.component.html',
  styleUrls: ['./itinerary.component.css']
})
export class ItineraryComponent implements OnInit {
  customizationDetails: string = '';
  packageID: number | null = null;
  userID: number | null = null;
  isLoading = false;

  itineraries: Itinerary[] = [];
  isEditing = false;
  editingId: number | null = null;
  editForm: ItineraryDTO = this.blankItinerary();

  availablePackages: Package[] = []; // To hold all packages

  constructor(
    private itineraryService: ItineraryService,
    private toastr: ToastrService,
    private authService: AuthService,
    private packageService: PackageService
  ) {}

  ngOnInit(): void {
    this.authService.getUserIdByEmail().subscribe({
      next: (id) => {
        this.userID = id;
        this.fetchUserItineraries();
      },
      error: () => this.toastr.error('Unable to get user ID. Please log in again.', 'Error')
    });
    this.fetchPackages();
  }

  fetchPackages() {
    this.packageService.getPackages().subscribe({
      next: (pkgs) => (this.availablePackages = pkgs),
      error: () => this.toastr.error('Failed to load packages.', 'Error')
    });
  }

  blankItinerary(): ItineraryDTO {
    return {
      customizationDetails: '',
      userID: this.userID ?? 0,
      packageID: 0
    };
  }

  fetchUserItineraries() {
    if (this.userID == null) return;
    this.isLoading = true;
    this.itineraryService.searchItineraries(this.userID).subscribe({
      next: (data) => {
        this.itineraries = data;
        this.isLoading = false;
      },
      error: () => {
        this.toastr.error('Failed to load itineraries.', 'Error');
        this.isLoading = false;
      }
    });
  }

  submitItinerary() {
    if (!this.customizationDetails.trim() || this.packageID == null || this.userID == null) {
      this.toastr.warning('Please fill all fields!', 'Validation');
      return;
    }

    const itinerary: ItineraryDTO = {
      customizationDetails: this.customizationDetails,
      userID: this.userID,
      packageID: this.packageID
    };

    this.isLoading = true;
    this.itineraryService.createItinerary(itinerary).subscribe({
      next: () => {
        this.toastr.success('Itinerary created successfully!', 'Success');
        this.customizationDetails = '';
        this.packageID = null;
        this.fetchUserItineraries();
        this.isLoading = false;
      },
      error: () => {
        this.toastr.error('Failed to create itinerary.', 'Error');
        this.isLoading = false;
      }
    });
  }

  startEdit(itinerary: Itinerary) {
    this.isEditing = true;
    this.editingId = itinerary.itineraryID;
    this.editForm = {
      customizationDetails: itinerary.customizationDetails,
      userID: itinerary.userID,
      packageID: itinerary.packageID
    };
  }

  cancelEdit() {
    this.isEditing = false;
    this.editingId = null;
    this.editForm = this.blankItinerary();
  }

  submitEdit() {
    if (this.editingId == null) return;
    this.isLoading = true;
    this.itineraryService.updateItinerary(this.editingId, this.editForm).subscribe({
      next: () => {
        this.toastr.success('Itinerary updated successfully.', 'Success');
        this.fetchUserItineraries();
        this.cancelEdit();
        this.isLoading = false;
      },
      error: () => {
        this.toastr.error('Failed to update itinerary.', 'Error');
        this.isLoading = false;
      }
    });
  }

  confirmDelete(id: number) {
    if (!confirm('Are you sure you want to delete this itinerary?')) return;
    this.isLoading = true;
    this.itineraryService.deleteItinerary(id).subscribe({
      next: () => {
        this.toastr.success('Itinerary deleted.', 'Success');
        this.fetchUserItineraries();
        this.isLoading = false;
      },
      error: () => {
        this.toastr.error('Failed to delete itinerary.', 'Error');
        this.isLoading = false;
      }
    });
  }

  getPackageName(packageID: number): string {
    const pkg = this.availablePackages.find(pkg => pkg.packageID === packageID);
    return pkg ? pkg.name : packageID.toString();
  }
}