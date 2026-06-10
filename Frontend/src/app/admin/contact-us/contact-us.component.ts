import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr'; // Import ToastrService

@Component({
  standalone: false,
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactComponent implements OnInit {
  contactMessages: any[] = []; // Holds the messages fetched from the API
  apiUrl = 'https://localhost:7193/api/ContactUs'; // API endpoint

  constructor(private http: HttpClient, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.fetchContactMessages();
  }

  /**
   * Generates the Authorization headers with the token from sessionStorage
   */
  private getAuthHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('token');
    if (token) {
      return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    }
    console.error('Token not found in sessionStorage');
    return new HttpHeaders();
  }

  /**
   * Fetches all "Contact Us" messages from the API
   */
  fetchContactMessages(): void {
    const headers = this.getAuthHeaders();

    this.http.get<any[]>(this.apiUrl, { headers }).subscribe({
      next: (data) => {
        this.contactMessages = data; // Set the fetched data to the messages array
      },
      error: (error) => {
        console.error('Error fetching contact us messages:', error);
        // Display a specific error message based on the status
        if (error.status === 401) {
          this.toastr.error('Unauthorized access. Please log in.', 'Error');
        } else if (error.status === 403) {
          this.toastr.error('Forbidden. You do not have permission to view these messages.', 'Error');
        } else if (error.status === 404) {
          this.toastr.error('API endpoint not found. Please check the backend configuration.', 'Error');
        } else {
          this.toastr.error('Failed to load messages. Please try again.', 'Error');
        }
      }
    });
  }
}