import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BookingService } from '../../services/booking.service';
import { Booking } from '../../models/booking.model';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: false,
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  bookings: Booking[] = [];
  filteredBookings: Booking[] = [];
  userId: number = 0;
  isLoading: boolean = false;
  filterType: string = 'all';

  constructor(
    private bookingService: BookingService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.fetchUserIdAndLoadBookings();
  }

  private fetchUserIdAndLoadBookings(): void {
    this.authService.getUserIdByEmail().subscribe({
      next: (id) => {
        if (id && id > 0) {
          this.userId = id;
          this.loadBookings();
        } else {
          this.toastr.warning('Invalid user. Please log in again.', 'Warning');
        }
      },
      error: () => {
        this.toastr.error('Failed to identify user. Please log in again.', 'Error');
      }
    });
  }

  private loadBookings(): void {
    this.isLoading = true;
    this.bookingService.getBookingsByUserId(this.userId).subscribe({
      next: (data) => {
        this.bookings = data;
        this.applyFilter();
        this.isLoading = false;
      },
      error: () => {
        this.toastr.info('No Bookings Found');
        this.isLoading = false;
      }
    });
  }

  onFilterTypeChange(type: string): void {
    this.filterType = type;
    this.applyFilter();
  }

  private applyFilter(): void {
    if (this.filterType === 'all') {
      this.filteredBookings = this.bookings;
    } else {
      this.filteredBookings = this.bookings.filter(b => b.type?.toLowerCase() === this.filterType);
    }
  }
}
