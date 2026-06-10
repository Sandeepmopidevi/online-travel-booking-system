import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { HotelService } from '../../services/hotel.service';
import { Hotel } from '../../models/hotel.model';

@Component({
  standalone: false,
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css']
})
export class HotelsComponent implements OnInit {
  hotels: Hotel[] = [];
  filteredHotels: Hotel[] = [];
  userId: number = 0;
  isLoading: boolean = false;
  isRedirecting: boolean = false;

  // Deterministic image assignment: these filenames must exist in assets/
  hotelImages: string[] = [
    'hotel1.jpg',
    'hotel2.jpg',
    'hotel3.jpg',
    'hotel4.jpg',
    'hotel5.jpg',
    'hotel6.jpg',
  ];

  searchName: string = '';
  searchLocation: string = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService,
    private hotelService: HotelService
  ) {}

  ngOnInit(): void {
    this.fetchUserIdAndLoadHotels();
  }

  private fetchUserIdAndLoadHotels(): void {
    const token = this.authService.getToken();
    if (!token || this.authService.isTokenExpired(token)) {
      this.toastr.error('Your session has expired. Please log in again.', 'Session Expired');
      this.authService.logout();
      this.router.navigate(['/login']);
      return;
    }

    this.authService.getUserIdByEmail().subscribe({
      next: (id) => {
        this.userId = id;
        this.loadHotels();
      },
      error: (err) => {
        console.error('Failed to get userId:', err);
        if (err.status === 403) {
          this.toastr.error('You do not have permission to access this resource.', 'Access Denied');
        } else if (err.status === 401) {
          this.toastr.error('Unauthorized access. Please log in again.', 'Unauthorized');
          this.authService.logout();
          this.router.navigate(['/login']);
        } else {
          this.toastr.error('Could not determine user identity. Please try again.', 'Error');
        }
      }
    });
  }

  // Deterministically assigns an image to each hotel based on hotelID
  private assignFixedImages(hotels: Hotel[]): Hotel[] {
    return hotels.map((hotel) => ({
      ...hotel,
      image: this.hotelImages[hotel.hotelID % this.hotelImages.length]
    }));
  }

  private loadHotels(): void {
    this.isLoading = true;
    this.hotelService.getHotels().subscribe({
      next: (data) => {
        this.hotels = this.assignFixedImages(data);
        this.filteredHotels = this.hotels;
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        this.toastr.error('Failed to load hotel listings. Please try again later.', 'Error');
      }
    });
  }

  searchHotels(): void {
    const name = this.searchName.trim().toLowerCase();
    const location = this.searchLocation.trim().toLowerCase();

    this.filteredHotels = this.hotels.filter(hotel => {
      const matchesName = !name || hotel.name.toLowerCase().includes(name);
      const matchesLocation = !location || hotel.location.toLowerCase().includes(location);
      return matchesName && matchesLocation;
    });

    if (!this.filteredHotels.length) {
      this.toastr.info('No hotels found for the selected criteria.', 'No Results');
    }
  }

  resetSearch(): void {
    this.searchName = '';
    this.searchLocation = '';
    this.filteredHotels = this.hotels;
  }

  navigateToPayment(hotel: Hotel): void {
    if (!hotel || !this.userId) return;
    this.isRedirecting = true;
    this.toastr.info(`Redirecting to payment for ${hotel.name}.`, 'Payment Info');
    this.router.navigate(['/user/payment'], {
      queryParams: {
        amount: hotel.pricePerNight,
        hotelID: hotel.hotelID,
        userID: this.userId
      }
    });
  }

  onImageError(event: Event): void {
    const target = event.target as HTMLImageElement;
    target.src = 'assets/default-hotel.jpg';
    target.alt = 'Default Hotel Image';
  }
}