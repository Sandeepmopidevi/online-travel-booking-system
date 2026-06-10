import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Payment } from '../models/payment.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private baseUrl = 'https://localhost:7193/api/Payment';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // Create a payment
  createPayment(payment: {
    bookingId: number;
    userId: number;
    amount: number;
    status: string;
    paymentMethod: string;
  }): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post<any>(`${this.baseUrl}/CreatePayment`, payment, { headers });
  }

  // Get all payments (admin)
  getPayments(): Observable<Payment[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Payment[]>(`${this.baseUrl}/GetPayments`, { headers });
  }

  // Get a payment by ID
  getPaymentById(paymentId: number): Observable<Payment> {
    const headers = this.getAuthHeaders();
    return this.http.get<Payment>(`${this.baseUrl}/GetPayment/${paymentId}`, { headers });
  }
}