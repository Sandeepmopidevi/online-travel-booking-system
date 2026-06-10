import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PackageService } from '../../services/package.service';
import { Package } from '../../models/package.model';
import Swal from 'sweetalert2';

@Component({
  standalone: false,
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.css']
})
export class PackageComponent implements OnInit {

  packages: Package[] = [];
  filteredPackages: Package[] = [];
  editingPackage: Package = {
    packageID: 0,
    name: '',
    includedHotels: '',
    includedFlights: '',
    activities: '',
    price: 0,
    itineraries: []
  };
  isEditing: boolean = false;
  loading: boolean = false;
  pages: number[] = [];
  searchQuery: string = '';
  currentPage: number = 1;

  constructor(private packageService: PackageService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.loadPackages();
  }

  // Load all packages
  loadPackages(): void {
    this.loading = true;
    this.packageService.getPackages().subscribe(
      (data) => {
        this.packages = data.map(pkg => ({
          ...pkg,
          itineraries: pkg.itineraries ? pkg.itineraries : []
        }));
        this.filteredPackages = this.packages;
        this.loading = false;
        this.setPagination();
      },
      (error) => {
        console.error('Error fetching packages:', error);
        this.loading = false;
        this.toastr.error('Failed to load packages. Please try again.', 'Error');
      }
    );
  }

  // Search packages by name
  searchPackages(): void {
    if (!this.searchQuery.trim()) {
      this.loadPackages();
      this.toastr.info('Search cleared. Showing all packages.', 'Info');
      return;
    }

    this.loading = true;
    this.packageService.searchPackages(this.searchQuery).subscribe(
      (data) => {
        this.filteredPackages = data.map(pkg => ({
          ...pkg,
          itineraries: pkg.itineraries ? pkg.itineraries : []
        }));
        this.loading = false;
        this.setPagination();
        if (data.length === 0) {
          this.toastr.warning('No packages found for the given search query.', 'Warning');
        } else {
          this.toastr.success('Search results loaded successfully!', 'Success');
        }
      },
      (error) => {
        console.error('Error searching packages:', error);
        this.loading = false;
        this.toastr.error('Failed to search packages. Please try again.', 'Error');
      }
    );
  }

  // Handle package addition and editing
  onSubmit(): void {
    if (this.editingPackage.price < 0) {
      this.toastr.warning('Price must be greater than or equal to 0.', 'Validation Warning');
      return;
    }

    if (this.isEditing) {
      if (this.editingPackage.packageID == null) {
        this.toastr.error('Invalid package ID.', 'Error');
        return;
      }
      this.packageService.updatePackage(this.editingPackage.packageID, this.editingPackage).subscribe(
        () => {
          this.toastr.success('Package updated successfully!', 'Success');
          this.loadPackages();
        },
        (error) => {
          console.error('There was an error updating the package.', error);
          this.toastr.error('Failed to update the package. Please try again.', 'Error');
        }
      );
    } else {
      this.packageService.createPackage(this.editingPackage).subscribe(
        () => {
          this.toastr.success('Package added successfully!', 'Success');
          this.loadPackages();
        },
        (error) => {
          console.error('There was an error adding the package.', error);
          this.toastr.error('Failed to add the package. Please try again.', 'Error');
        }
      );
    }
    this.resetForm();
  }

  // Reset the form
  resetForm(): void {
    this.editingPackage = {
      packageID: 0,
      name: '',
      includedHotels: '',
      includedFlights: '',
      activities: '',
      price: 0,
      itineraries: []
    };
    this.isEditing = false;
  }

  // Start editing a package
  startEdit(pkg: Package): void {
    this.editingPackage = { ...pkg, itineraries: pkg.itineraries ? pkg.itineraries : [] };
    this.isEditing = true;
  }

  // Delete a package with SweetAlert2 confirmation
  deletePackage(id: number | undefined): void {
    if (id == null) {
      this.toastr.error('Invalid package ID.', 'Error');
      return;
    }
    Swal.fire({
      title: 'Are you sure?',
      text: 'This package will be permanently deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.packageService.deletePackage(id).subscribe(
          () => {
            this.toastr.success('Package deleted successfully!', 'Success');
            this.loadPackages();
          },
          (error) => {
            console.error('There was an error deleting the package.', error);
            this.toastr.error('Failed to delete the package. Please try again.', 'Error');
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.toastr.info('Package deletion cancelled.', 'Info');
      }
    });
  }

  // Pagination handling
  changePage(page: number): void {
    this.currentPage = page;
    this.setPagination();
  }

  setPagination(): void {
    const totalPages = Math.ceil(this.filteredPackages.length / 5);
    this.pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  }
}