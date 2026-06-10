import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BookingService } from '../../services/booking.service';
import { Booking, BookingDTO } from '../../models/booking.model';

@Component({
  standalone: false,
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {
  bookings: Booking[] = [];
  filteredBookings: Booking[] = [];
  searchId: string = '';
  editingBookingId: number | null = null;
  editBookingForm: BookingDTO = this.blankBookingDTO();

  constructor(
    private bookingService: BookingService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadBookings();
  }

  blankBookingDTO(): BookingDTO {
    return {
      userID: 0,
      status: '',
      paymentId: 0,
      type: ''
    };
  }

  loadBookings() {
    this.bookingService.getBookings().subscribe({
      next: (data) => {
        this.bookings = data;
        this.filteredBookings = data;
      },
      error: (error) => {
        console.error('Error loading bookings', error);
        this.toastr.error('Failed to load bookings. Please try again.', 'Error');
      }
    });
  }

  searchBookingById() {
    if (!this.searchId.trim()) {
      this.toastr.info('Search ID is empty. Showing all bookings.', 'Info');
      this.filteredBookings = this.bookings;
      return;
    }

    const bookingId = parseInt(this.searchId, 10);
    if (isNaN(bookingId)) {
      this.toastr.error('Invalid Booking ID. Please enter a valid number.', 'Error');
      return;
    }

    this.bookingService.getBookingById(bookingId).subscribe({
      next: (booking) => {
        this.filteredBookings = [booking];
        this.toastr.success('Booking found!', 'Success');
      },
      error: (error) => {
        console.error('No booking found with the given ID.', error);
        this.filteredBookings = [];
        this.toastr.warning('No booking found with the given ID.', 'Warning');
      }
    });
  }

  startEdit(booking: Booking) {
    this.editingBookingId = booking.bookingID;
    this.editBookingForm = {
      userID: booking.userID,
      status: booking.status,
      paymentId: booking.paymentId,
      type: booking.type
    };
  }

  saveEdit(bookingId: number) {
    this.bookingService.updateBooking(bookingId, this.editBookingForm).subscribe({
      next: (updated) => {
        this.toastr.success('Booking updated successfully!', 'Success');
        this.editingBookingId = null;
        this.editBookingForm = this.blankBookingDTO();
        this.loadBookings();
      },
      error: (error) => {
        this.toastr.error('Failed to update booking. Please try again.', 'Error');
      }
    });
  }

  cancelEdit() {
    this.editingBookingId = null;
    this.editBookingForm = this.blankBookingDTO();
  }

  // Cancel Booking (changes status to Cancelled in DB)
  cancelBooking(booking: Booking) {
    if (!confirm('Are you sure you want to cancel this booking?')) return;
    // Only update the status to "Cancelled"
    const cancelDTO: BookingDTO = {
      userID: booking.userID,
      status: 'Cancelled',
      paymentId: booking.paymentId,
      type: booking.type
    };
    this.bookingService.updateBooking(booking.bookingID, cancelDTO).subscribe({
      next: () => {
        this.toastr.success('Booking cancelled successfully!', 'Success');
        this.loadBookings();
      },
      error: (error) => {
        this.toastr.error('Failed to cancel booking. Please try again.', 'Error');
      }
    });
  }
}