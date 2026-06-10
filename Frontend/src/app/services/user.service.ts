import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User, UserDTO, UpdateUserNameContactDto } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://localhost:7193/api/Users';

  constructor(private http: HttpClient) {}

  // Generate authorization headers
  private getAuthHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getUsers(): Observable<User[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<User[]>(`${this.apiUrl}/GetUsers`, { headers });
  }

  getUserById(id: number): Observable<User> {
    const headers = this.getAuthHeaders();
    return this.http.get<User>(`${this.apiUrl}/GetUserById/${id}`, { headers });
  }

  createUser(user: UserDTO): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.apiUrl}/CreateUsers`, user, { headers });
  }

  updateUser(id: number, user: UserDTO): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.put(`${this.apiUrl}/UpdateUsers/${id}`, user, { headers });
  }

  deleteUser(id: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete(`${this.apiUrl}/DeleteUsers/${id}`, { headers });
  }

  // Add: Get UserId By Email
  getUserIdByEmail(email: string): Observable<{ userId: number }> {
    const headers = this.getAuthHeaders();
    return this.http.get<{ userId: number }>(`${this.apiUrl}/GetUserIdByEmail?email=${encodeURIComponent(email)}`, { headers });
  }

  // Add: Get User (Admin Only)
  getUser(id: number): Observable<User> {
    const headers = this.getAuthHeaders();
    return this.http.get<User>(`${this.apiUrl}/GetUser/${id}`, { headers });
  }

  // Add: Update User Profile Name and Contact (for logged-in user)
  updateUserProfile(updateUser: UpdateUserNameContactDto): Observable<UserDTO> {
    const headers = this.getAuthHeaders();
    return this.http.post<UserDTO>(`${this.apiUrl}/UpdateUserProfile`, updateUser, { headers });
  }
}