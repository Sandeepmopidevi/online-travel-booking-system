import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SupportTicket, SupportTicketDTO } from '../models/support-ticket.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SupportTicketService {
  private apiUrl = 'https://localhost:7193/api/SupportTicket';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getAuthHeaders(): HttpHeaders {
    return this.authService.getAuthHeaders();
  }

  getSupportTickets(): Observable<SupportTicket[]> {
    return this.http.get<SupportTicket[]>(`${this.apiUrl}/GetSupportTickets`, { headers: this.getAuthHeaders() });
  }

  getSupportTicket(id: number): Observable<SupportTicket> {
    return this.http.get<SupportTicket>(`${this.apiUrl}/GetSupportTicket/${id}`, { headers: this.getAuthHeaders() });
  }

  createSupportTicket(ticketDTO: SupportTicketDTO): Observable<SupportTicket> {
    return this.http.post<SupportTicket>(`${this.apiUrl}/CreateSupportTicket`, ticketDTO, { headers: this.getAuthHeaders() });
  }

  updateSupportTicket(id: number, ticketDTO: SupportTicketDTO): Observable<SupportTicket> {
    return this.http.put<SupportTicket>(`${this.apiUrl}/UpdateSupportTicket/${id}`, ticketDTO, { headers: this.getAuthHeaders() });
  }

  deleteSupportTicket(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/DeleteSupportTicket/${id}`, { headers: this.getAuthHeaders() });
  }
}