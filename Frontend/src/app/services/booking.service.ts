import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Booking, BookingDTO } from '../models/booking.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = 'https://localhost:7193/api/Booking';

  constructor(private http: HttpClient) {}

  // Helper method to get Authorization headers
  private getAuthHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // Fetch all bookings (admin)
  getBookings(): Observable<Booking[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Booking[]>(`${this.apiUrl}/GetBookings`, { headers });
  }

  // Fetch a booking by ID
  getBookingById(id: number): Observable<Booking> {
    const headers = this.getAuthHeaders();
    return this.http.get<Booking>(`${this.apiUrl}/GetBooking/${id}`, { headers });
  }

  // Fetch bookings by UserId
  getBookingsByUserId(userId: number): Observable<Booking[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Booking[]>(`${this.apiUrl}/GetBookingsByUser/${userId}`, { headers });
  }

  // Create a new booking
  createBooking(booking: BookingDTO): Observable<Booking> {
    const headers = this.getAuthHeaders();
    return this.http.post<Booking>(`${this.apiUrl}/CreateBooking`, booking, { headers });
  }

  // Update an existing booking
  updateBooking(id: number, booking: BookingDTO): Observable<Booking> {
    const headers = this.getAuthHeaders();
    return this.http.put<Booking>(`${this.apiUrl}/UpdateBooking/${id}`, booking, { headers });
  }

  // Delete a booking by ID
  deleteBooking(id: number): Observable<{ message: string }> {
    const headers = this.getAuthHeaders();
    return this.http.delete<{ message: string }>(`${this.apiUrl}/DeleteBooking/${id}`, { headers });
  }

  // Search bookings by BookingID
  searchBookings(bookingID: number): Observable<Booking[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Booking[]>(`${this.apiUrl}/SearchBookings`, {
      headers,
      params: { BookingID: bookingID.toString() }
    });
  }

  // Cancel booking and refund
  cancelBookingAndRefund(id: number, booking: BookingDTO): Observable<Booking> {
    const headers = this.getAuthHeaders();
    return this.http.put<Booking>(`${this.apiUrl}/CancelBookingAndRefund/${id}`, booking, { headers });
  }
}