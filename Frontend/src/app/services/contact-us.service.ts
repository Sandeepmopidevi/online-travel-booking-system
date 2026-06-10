import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactUsService {
  private apiUrl = 'https://localhost:7193/api/ContactUs';

  constructor(private http: HttpClient) {}


   // Helper method to get Authorization headers

  private getAuthHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('token');
    if (token) {
      console.log('Using token:', token); // Log the token for debugging
      return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    }
    console.error('Token not found in sessionStorage');
    return new HttpHeaders(); // Return empty headers if token is missing
  }

  postMessage(message: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(this.apiUrl, message, { headers }).pipe(
      catchError(this.handleError) // Handle errors
    );
  }

  getMessages(): Observable<any[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<any[]>(this.apiUrl, { headers }).pipe(
      catchError(this.handleError) // Handle errors
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      // Backend error
      errorMessage = `Server error: ${error.status} - ${error.message}`;
    }
    console.error('HTTP Error:', errorMessage); // Log the error
    return throwError(() => new Error(errorMessage)); // Return an observable with an error message
  }
}
