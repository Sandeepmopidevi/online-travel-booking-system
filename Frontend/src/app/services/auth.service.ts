import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'https://localhost:7193/api';
  private authUrl = `${this.baseUrl}/Auth`;

  // BehaviorSubjects for login state and user role
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  private userRoleSubject = new BehaviorSubject<string | null>(this.getUserRoleFromStorage()); // Initialize with role from session storage

  // Expose observables for components to subscribe to
  isLoggedIn$ = this.isLoggedInSubject.asObservable(); 
  userRole$ = this.userRoleSubject.asObservable(); 

  constructor(private http: HttpClient) {
    this.checkLoginState(); // Check login state on service initialization
    // Initialize the isLoggedInSubject based on the token presence and validity
  }

  login(data: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.authUrl}/login`, data).pipe(
      map((response) => {
        if (response && response.token && response.email && response.roles) {
          sessionStorage.setItem('token', response.token);
          sessionStorage.setItem('email', response.email);
          sessionStorage.setItem('roles', JSON.stringify(response.roles));
          this.isLoggedInSubject.next(true);
          this.userRoleSubject.next(response.roles[0] || null);
        }
        return response;
      }),
      catchError((error) => {
        console.error('Login error:', error);
        return throwError(() => new Error('Login failed. Please check your credentials.'));
      })
    );
  }

  register(data: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.authUrl}/register`, data).pipe(
      catchError((error) => {
        console.error('Registration error:', error);
        return throwError(() => new Error('Registration failed. Please try again later.'));
      })
    );
  }

   // Get the logged-in user's role as observable.
  getUserRole(): string | null {
    return this.userRoleSubject.value;
  }


   // Return user role directly from storage (for initialization).

  private getUserRoleFromStorage(): string | null {
    const roles = sessionStorage.getItem('roles');
    if (roles) {
      try {
        const parsedRoles: string[] = JSON.parse(roles);
        return parsedRoles.length > 0 ? parsedRoles[0] : null;
      } catch (error) {
        console.error('Error parsing roles from session storage', error);
        return null;
      }
    }
    return null;
  }

  getCurrentUser(): { email: string; roles: string[] } | null {
    const email = sessionStorage.getItem('email');
    const roles = sessionStorage.getItem('roles');
    if (email && roles) {
      return {
        email: email,
        roles: JSON.parse(roles),
      };
    }
    return null;
  }

  getUserIdByEmail(): Observable<number> {
    const currentUser = this.getCurrentUser();
    if (!currentUser || !currentUser.email) {
      return throwError(() => new Error('User is not logged in.'));
    }

    const email = currentUser.email;
    if (!this.validateEmail(email)) {
      return throwError(() => new Error('Invalid email format.'));
    }

    const headers = this.getAuthHeaders();

    return this.http
      .get<{ userId: number }>(`${this.baseUrl}/Users/GetUserIdByEmail?email=${encodeURIComponent(email)}`, { headers })
      .pipe(
        map((response) => {
          if (response && response.userId) {
            return response.userId;
          } else {
            throw new Error('UserId not found in the response.');
          }
        }),
        catchError((error) => {
          console.error('Error fetching UserId:', error);
          if (error.status === 404) {
            return throwError(() => new Error('User email not found.'));
          } else if (error.status === 403) {
            return throwError(() => new Error('Access denied.'));
          } else if (error.status === 401) {
            return throwError(() => new Error('Unauthorized. Please log in again.'));
          }
          return throwError(() => new Error('Failed to fetch UserId. Please try again later.'));
        })
      );
  }

  checkLoginState(): void {
    const token = this.getToken();
    if (token && !this.isTokenExpired(token)) {
      this.isLoggedInSubject.next(true);
      // Also update the userRoleSubject in case token/roles were refreshed
      this.userRoleSubject.next(this.getUserRoleFromStorage());
    } else {
      this.isLoggedInSubject.next(false);
      this.userRoleSubject.next(null);
    }
  }

  getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('roles');
    this.isLoggedInSubject.next(false);
    this.userRoleSubject.next(null);
  }

  private validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expiry = payload.exp * 1000;
      return Date.now() > expiry;
    } catch (error) {
      console.error('Invalid token format', error);
      return true;
    }
  }

  public getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  email: string;
  roles: string[];
  token: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role: string;
  contactNumber: string;
}

export interface RegisterResponse {
  message: string;
}