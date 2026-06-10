import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FlightsService {
  private baseUrl = 'https://localhost:7193/api/Flight';

  constructor(private http: HttpClient) {}

  // Generate authorization headers
  private getAuthHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // Get all flights
  getAllFlights(): Observable<any[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<any[]>(`${this.baseUrl}/GetFlights`, { headers });
  }

  // Search flights by boardingCity and destinationCity
  searchFlights(boardingCity: string, destinationCity: string): Observable<any[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<any[]>(
      `${this.baseUrl}/SearchFlights?boardingCity=${encodeURIComponent(boardingCity)}&destinationCity=${encodeURIComponent(destinationCity)}`,
      { headers }
    );
  }

  // Get a flight by ID
  getFlightById(flightID: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get<any>(`${this.baseUrl}/GetFlight/${flightID}`, { headers });
  }

  // Create a flight
  createFlight(flight: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post<any>(`${this.baseUrl}/CreateFlights`, flight, { headers });
  }

  // Update a flight by ID
  updateFlight(flightID: number, flight: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.put<any>(`${this.baseUrl}/UpdateFlight/${flightID}`, flight, { headers });
  }

  // Delete a flight by ID
  deleteFlight(flightID: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete<any>(`${this.baseUrl}/DeleteFlight/${flightID}`, { headers });
  }
}