import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BookingDTO } from '../models/booking.model';
import { Hotel } from '../models/hotel.model';

@Injectable({
  providedIn: 'root',
})
export class HotelService {
  private baseUrl = 'https://localhost:7193/api/Hotel';
  private bookingBaseUrl = 'https://localhost:7193/api/Booking';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getHotels(): Observable<Hotel[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Hotel[]>(`${this.baseUrl}/GetHotels`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Search by name, location,
  searchHotels(name: string, location: string, checkInDate?: string, checkOutDate?: string): Observable<Hotel[]> {
    const headers = this.getAuthHeaders();
    let params = [];
    if (name) params.push(`name=${encodeURIComponent(name)}`);
    if (location) params.push(`location=${encodeURIComponent(location)}`);
    if (checkInDate) params.push(`checkInDate=${encodeURIComponent(checkInDate)}`);
    if (checkOutDate) params.push(`checkOutDate=${encodeURIComponent(checkOutDate)}`);
    const queryString = params.length ? '?' + params.join('&') : '';
    return this.http.get<Hotel[]>(`${this.baseUrl}/SearchHotels${queryString}`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  createBooking(booking: BookingDTO): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.bookingBaseUrl}/CreateBooking`, booking, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  createHotel(hotel: Hotel): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.baseUrl}/CreateHotels`, hotel, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  updateHotel(hotelID: number, hotel: Hotel): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.put(`${this.baseUrl}/UpdateHotel/${hotelID}`, hotel, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  deleteHotel(hotelID: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete(`${this.baseUrl}/DeleteHotel/${hotelID}`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something went wrong. Please try again later.'));
  }
}