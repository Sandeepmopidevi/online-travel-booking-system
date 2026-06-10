import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  private baseUrl = 'https://localhost:7193/api';

  constructor(private http: HttpClient) {}

  // AUTH HEADER
  private getAuthHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token ? token : ''}`
    });
  }

  // ------- Package Review Endpoints -------
  createPackageReview(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/PackageReview/CreateReviews`, data, { headers: this.getAuthHeaders() });
  }
  getPackageReviews(): Observable<any> {
    return this.http.get(`${this.baseUrl}/PackageReview/GetReviews`, { headers: this.getAuthHeaders() });
  }
  getPackageReview(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/PackageReview/GetReview/${id}`, { headers: this.getAuthHeaders() });
  }
  updatePackageReview(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/PackageReview/UpdateReview/${id}`, data, { headers: this.getAuthHeaders() });
  }
  deletePackageReview(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/PackageReview/DeleteReview/${id}`, { headers: this.getAuthHeaders() });
  }

  // ------- Hotel Review Endpoints -------
  createHotelReview(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/HotelReview/CreateReviews`, data, { headers: this.getAuthHeaders() });
  }
  getHotelReviews(): Observable<any> {
    return this.http.get(`${this.baseUrl}/HotelReview/GetReviews`, { headers: this.getAuthHeaders() });
  }
  getHotelReview(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/HotelReview/GetReview/${id}`, { headers: this.getAuthHeaders() });
  }
  updateHotelReview(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/HotelReview/UpdateReview/${id}`, data, { headers: this.getAuthHeaders() });
  }
  deleteHotelReview(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/HotelReview/DeleteReview/${id}`, { headers: this.getAuthHeaders() });
  }

  // ------- Flight Review Endpoints -------
  createFlightReview(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/FlightReview/CreateReviews`, data, { headers: this.getAuthHeaders() });
  }
  getFlightReviews(): Observable<any> {
    return this.http.get(`${this.baseUrl}/FlightReview/GetReviews`, { headers: this.getAuthHeaders() });
  }
  getFlightReview(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/FlightReview/GetReview/${id}`, { headers: this.getAuthHeaders() });
  }
  updateFlightReview(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/FlightReview/UpdateReview/${id}`, data, { headers: this.getAuthHeaders() });
  }
  deleteFlightReview(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/FlightReview/DeleteReview/${id}`, { headers: this.getAuthHeaders() });
  }

  // ------- Hotel Endpoints (for admin use) -------
  createHotel(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/Hotel/CreateHotels`, data, { headers: this.getAuthHeaders() });
  }
  getHotels(): Observable<any> {
    return this.http.get(`${this.baseUrl}/Hotel/GetHotels`, { headers: this.getAuthHeaders() });
  }
  getHotel(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/Hotel/GetHotel/${id}`, { headers: this.getAuthHeaders() });
  }
  updateHotel(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/Hotel/UpdateHotel/${id}`, data, { headers: this.getAuthHeaders() });
  }
  deleteHotel(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/Hotel/DeleteHotel/${id}`, { headers: this.getAuthHeaders() });
  }
  searchHotels(params: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/Hotel/SearchHotels`, { params, headers: this.getAuthHeaders() });
  }
}