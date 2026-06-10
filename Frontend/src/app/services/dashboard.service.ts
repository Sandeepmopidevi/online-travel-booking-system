import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private bookingsUrl = 'https://localhost:7193/api/Booking/GetBookings';
  private flightsUrl = 'https://localhost:7193/api/Flight/GetFlights';
  private hotelsUrl = 'https://localhost:7193/api/Hotel/GetHotels';
  private packagesUrl = 'https://localhost:7193/api/Package/GetPackages';
  private itinerariesUrl = 'https://localhost:7193/api/Itinerary/GetItinerary';
  private usersUrl = 'https://localhost:7193/api/Users/GetUsers';

  constructor(private http: HttpClient) {}

  // Create a method to generate authorization headers
  private getAuthHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // Fetch data from all APIs and count the records
  getAllCounts(): Observable<any> {
    const headers = this.getAuthHeaders();

    return forkJoin({
      bookings: this.http.get<any[]>(this.bookingsUrl, { headers }),
      flights: this.http.get<any[]>(this.flightsUrl, { headers }),
      hotels: this.http.get<any[]>(this.hotelsUrl, { headers }),
      packages: this.http.get<any[]>(this.packagesUrl, { headers }),
      itineraries: this.http.get<any[]>(this.itinerariesUrl, { headers }),
      users: this.http.get<any[]>(this.usersUrl, { headers })
    }).pipe(
      map((data) => ({
        totalBookings: data.bookings.length,
        totalFlights: data.flights.length,
        totalHotels: data.hotels.length,
        totalPackages: data.packages.length,
        totalItineraries: data.itineraries.length,
        totalUsers: data.users.length
      }))
    );
  }
}