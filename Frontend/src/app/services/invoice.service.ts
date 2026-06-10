import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Invoice } from '../models/invoice.model';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private baseUrl = 'https://localhost:7193/api/Invoice';

  constructor(private http: HttpClient) {}

  // Generate authorization headers
  private getAuthHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // Create an invoice
  createInvoice(invoice: Invoice): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.baseUrl}/CreateInvoices`, invoice, { headers });
  }

  // Get all invoices
  getInvoices(): Observable<Invoice[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Invoice[]>(`${this.baseUrl}/GetInvoices`, { headers });
  }

  // Get single invoice by ID
  getInvoiceById(id: number): Observable<Invoice> {
    const headers = this.getAuthHeaders();
    return this.http.get<Invoice>(`${this.baseUrl}/GetInvoice/${id}`, { headers });
  }

  // Update an invoice by ID
  updateInvoice(id: number, invoice: Invoice): Observable<Invoice> {
    const headers = this.getAuthHeaders();
    return this.http.put<Invoice>(`${this.baseUrl}/UpdateInvoice/${id}`, invoice, { headers });
  }

  // Delete an invoice by ID
  deleteInvoice(id: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete(`${this.baseUrl}/DeleteInvoice/${id}`, { headers });
  }
}