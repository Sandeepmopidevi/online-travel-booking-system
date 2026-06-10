import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Itinerary {
  itineraryID: number;
  customizationDetails: string;
  userID: number;
  packageID: number;
}

export interface ItineraryDTO {
  customizationDetails: string;
  userID: number;
  packageID: number;
}

@Injectable({
  providedIn: 'root'
})
export class ItineraryService {
  private baseUrl = 'https://localhost:7193/api/Itinerary';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // GET all itineraries (Admin only)
  getItineraries(): Observable<Itinerary[]> {
    return this.http.get<Itinerary[]>(`${this.baseUrl}/GetItinerary`, {
      headers: this.getAuthHeaders()
    });
  }

  // GET a single itinerary by ID
  getItineraryById(id: number): Observable<Itinerary> {
    return this.http.get<Itinerary>(`${this.baseUrl}/GetItinerary/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  // POST create itinerary
  createItinerary(itinerary: ItineraryDTO): Observable<any> {
    return this.http.post(`${this.baseUrl}/CreateItinerary`, itinerary, {
      headers: this.getAuthHeaders()
    });
  }

  // PUT update itinerary
  updateItinerary(id: number, itinerary: ItineraryDTO): Observable<Itinerary> {
    return this.http.put<Itinerary>(`${this.baseUrl}/UpdateItinerary/${id}`, itinerary, {
      headers: this.getAuthHeaders()
    });
  }

  // DELETE itinerary
  deleteItinerary(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/DeleteItinerary/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  // SEARCH itineraries by UserID
  searchItineraries(userId: number): Observable<Itinerary[]> {
    return this.http.get<Itinerary[]>(`${this.baseUrl}/SearchItineraries?UserID=${userId}`, {
      headers: this.getAuthHeaders()
    });
  }
}