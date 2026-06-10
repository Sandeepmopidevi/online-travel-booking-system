import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';

interface Flight {
  flightID: number;
  airline: string;
  flightNumber: string;
  boardingCity: string;
  destinationCity: string;
  departure: string;
  arrival: string;
  price: number;
  availability: boolean;
}

@Component({
  standalone: false,
  selector: 'app-flight-book',
  templateUrl: './flight-book.component.html',
  styleUrls: ['./flight-book.component.css']
})
export class FlightBookComponent implements OnInit {
  flights: Flight[] = [];
  filteredFlights: Flight[] = [];
  userId: number = 0;
  isLoading: boolean = false;
  isRedirecting: boolean = false;
  // Search fields
  from: string = '';
  to: string = '';
  airline: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.fetchUserIdAndLoadFlights();
  }

  private fetchUserIdAndLoadFlights(): void {
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
        this.loadFlights();
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

  private loadFlights(): void {
    this.isLoading = true;
    const headers = this.authService.getAuthHeaders();
    this.http.get<Flight[]>('https://localhost:7193/api/Flight/GetFlights', { headers }).subscribe({
      next: (data) => {
        this.flights = data;
        this.filteredFlights = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Flight fetch error:', err);
        this.isLoading = false;
        if (err.status === 403) {
          this.toastr.error('You do not have permission to access this resource.', 'Access Denied');
        } else if (err.status === 401) {
          this.toastr.error('Unauthorized access. Please log in again.', 'Unauthorized');
          this.authService.logout();
          this.router.navigate(['/login']);
        } else {
          this.toastr.error('Failed to load flight listings. Please try again later.', 'Error');
        }
      }
    });
  }

  searchFlights(): void {
    this.filteredFlights = this.flights.filter(flight =>
      (!this.from || flight.boardingCity.toLowerCase().includes(this.from.toLowerCase())) &&
      (!this.to || flight.destinationCity.toLowerCase().includes(this.to.toLowerCase())) &&
      (!this.airline || flight.airline.toLowerCase().includes(this.airline.toLowerCase()))
    );
  }

  navigateToPayment(flight: Flight): void {
    if (!flight || !this.userId) return;
    this.isRedirecting = true;
    this.toastr.info(`Redirecting to payment for Flight ${flight.flightNumber}.`, 'Payment Info');
    this.router.navigate(['/user/payment'], {
      queryParams: {
        amount: flight.price,
        flightID: flight.flightID,
        userID: this.userId,
        type: 'Flight'
      }
    });
  }
} 