import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HotelService } from '../../services/hotel.service';
import Swal from 'sweetalert2';

@Component({
  standalone: false,
  selector: 'app-hotel-management',
  templateUrl: './hotel-management.component.html',
  styleUrls: ['./hotel-management.component.css'],
})
export class HotelManagementComponent implements OnInit {
  hotels: any[] = [];
  hotelForm: any = {};
  editingHotelId: number | null = null;
  searchQuery: string = '';
  locationQuery: string = '';
  submitted: boolean = false;
  validationErrors: any = {};

  constructor(
    private hotelService: HotelService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadHotels();
  }

  // Fetch the list of hotels
  loadHotels() {
    this.hotelService.getHotels().subscribe(
      (data: any) => {
        this.hotels = data;
      },
      (error) => {
        this.toastr.error('Failed to load hotels. Please try again.', 'Error');
      }
    );
  }

  // Search only on button click
  onSearchTriggered() {
    const searchIsFilled = this.searchQuery && this.searchQuery.trim().length > 0;
    const locationIsFilled = this.locationQuery && this.locationQuery.trim().length > 0;

    if (!searchIsFilled && !locationIsFilled) {
      this.loadHotels();
      return;
    }
    this.hotelService.searchHotels(this.searchQuery, this.locationQuery).subscribe(
      (data: any) => {
        this.hotels = data;
        if (data.length === 0) {
          this.toastr.warning('No hotels found with the given criteria.', 'Warning');
        } else {
          this.toastr.success('Search results loaded successfully!', 'Success');
        }
      },
      (error) => {
        this.toastr.error('Failed to search hotels. Please try again.', 'Error');
      }
    );
  }

  // Handle form submission for creating or updating a hotel
  onSubmit() {
    this.submitted = true;
    this.validationErrors = {};

    // Field validations
    if (!this.hotelForm.name || !this.hotelForm.name.trim()) {
      this.validationErrors.name = 'Hotel name is required.';
    }
    if (!this.hotelForm.location || !this.hotelForm.location.trim()) {
      this.validationErrors.location = 'Location is required.';
    }
    if (
      this.hotelForm.roomsAvailable === undefined || this.hotelForm.roomsAvailable === null ||
      this.hotelForm.roomsAvailable === '' || isNaN(this.hotelForm.roomsAvailable)
    ) {
      this.validationErrors.roomsAvailable = 'Rooms Available is required and must be a number.';
    } else if (this.hotelForm.roomsAvailable < 0) {
      this.validationErrors.roomsAvailable = 'Rooms Available cannot be negative.';
    }
    if (
      this.hotelForm.rating === undefined || this.hotelForm.rating === null ||
      this.hotelForm.rating === '' || isNaN(this.hotelForm.rating)
    ) {
      this.validationErrors.rating = 'Rating is required and must be a number.';
    } else if (this.hotelForm.rating < 1 || this.hotelForm.rating > 5) {
      this.validationErrors.rating = 'Rating must be between 1 and 5.';
    }
    if (
      this.hotelForm.pricePerNight === undefined || this.hotelForm.pricePerNight === null ||
      this.hotelForm.pricePerNight === '' || isNaN(this.hotelForm.pricePerNight)
    ) {
      this.validationErrors.pricePerNight = 'Price Per Night is required and must be a number.';
    } else if (this.hotelForm.pricePerNight < 0) {
      this.validationErrors.pricePerNight = 'Price cannot be less than 0.';
    }

    // If any errors, do not proceed
    if (Object.keys(this.validationErrors).length > 0) {
      return;
    }

    // If all validations pass, proceed
    if (this.editingHotelId) {
      this.hotelService.updateHotel(this.editingHotelId, this.hotelForm).subscribe(
        () => {
          this.toastr.success('Hotel updated successfully!', 'Success');
          this.resetForm();
          this.loadHotels();
        },
        (error) => {
          this.toastr.error('Failed to update hotel. Please try again.', 'Error');
        }
      );
    } else {
      this.hotelService.createHotel(this.hotelForm).subscribe(
        () => {
          this.toastr.success('Hotel created successfully!', 'Success');
          this.resetForm();
          this.loadHotels();
        },
        (error) => {
          this.toastr.error('Failed to create hotel. Please try again.', 'Error');
        }
      );
    }
  }

  // Populate form with hotel details for editing
  editHotel(hotel: any) {
    this.hotelForm = { ...hotel };
    this.editingHotelId = hotel.hotelID;
    this.submitted = false;
    this.validationErrors = {};
  }

  // Delete a hotel with SweetAlert2 confirmation
  deleteHotel(hotelID: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This hotel will be permanently deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.hotelService.deleteHotel(hotelID).subscribe(
          () => {
            this.toastr.success('Hotel has been deleted successfully!', 'Success');
            this.loadHotels();
          },
          (error) => {
            this.toastr.error('Failed to delete hotel. Please try again.', 'Error');
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.toastr.info('Hotel deletion cancelled.', 'Info');
      }
    });
  }

  // Reset form and clear warnings
  resetForm() {
    this.hotelForm = {};
    this.editingHotelId = null;
    this.submitted = false;
    this.validationErrors = {};
  }
}