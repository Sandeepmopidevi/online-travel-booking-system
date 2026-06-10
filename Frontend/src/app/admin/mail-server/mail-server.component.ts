import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  standalone: false,
  selector: 'app-mail-server',
  templateUrl: './mail-server.component.html',
  styleUrls: ['./mail-server.component.css']
})
export class MailServerComponent {
  emailRequest = {
    to: '',
    subject: '',
    body: ''
  };
  isLoading = false;

  constructor(private http: HttpClient, private toastr: ToastrService) {}

  sendEmail() {
    if (!this.emailRequest.to || !this.emailRequest.subject || !this.emailRequest.body) {
      this.toastr.warning('Please fill in all fields.', 'Validation Warning'); // Warning notification
      return;
    }

    this.isLoading = true;

    this.http.post(
      'https://localhost:7193/api/Email/send',
      this.emailRequest,
      { headers: this.getAuthHeaders(), responseType: 'text' }
    )
      .subscribe({
        next: (response: string) => {
          this.isLoading = false;
          this.toastr.success(response, 'Email Sent'); // Success notification
          this.emailRequest = { to: '', subject: '', body: '' };
        },
        error: (error) => {
          this.isLoading = false;
          this.toastr.error('Failed to send email. Please try again.', 'Error'); // Error notification
          console.error('Error sending email:', error);
        }
      });
  }

  private getAuthHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('token');
    if (token) {
      console.log('Using token:', token); // Log the token for debugging
      return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    }
    console.error('Token not found in sessionStorage');
    return new HttpHeaders(); // Return empty headers if token is missing
  }
}