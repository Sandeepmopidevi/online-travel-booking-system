import { Component, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  standalone: false,
  selector: 'app-rating-prompt',
  templateUrl: './rating-prompt.component.html',
  styleUrls: ['./rating-prompt.component.css']
})
export class RatingPromptComponent {
  @Input() type: string = ''; // 'Hotel', 'Package', 'Flight'
  @Input() hotelId?: number;
  @Input() packageId?: number;
  @Input() flightId?: number;
  @Input() userId?: number;

  rating = 0;
  hoverRating = 0;
  comment = '';
  isSubmitting = false;

  constructor(
    private toastr: ToastrService,
    private http: HttpClient,
    private router: Router
  ) {}

  setRating(star: number) {
    this.rating = star;
    this.hoverRating = 0;
  }

  setHover(star: number) {
    this.hoverRating = star;
  }

  clearHover() {
    this.hoverRating = 0;
  }

  submitReview() {
    if (!this.rating || !this.comment.trim() || !this.userId) {
      this.toastr.warning('Please provide a rating and comment.', 'Validation');
      return;
    }

    this.isSubmitting = true;
    let apiUrl = '';
    let data: any = {
      rating: this.rating,
      comment: this.comment,
      timestamp: new Date().toISOString(),
      userID: this.userId
    };

    // Assign correct id and API endpoint
    if (this.type === 'Hotel' && this.hotelId) {
      apiUrl = 'https://localhost:7193/api/HotelReview/CreateReviews';
      data.hotelId = this.hotelId;
    } else if (this.type === 'Flight' && this.flightId) {
      apiUrl = 'https://localhost:7193/api/FlightReview/CreateReviews';
      data.flightId = this.flightId;
    } else if (this.type === 'Package' && this.packageId) {
      apiUrl = 'https://localhost:7193/api/PackageReview/CreateReviews';
      data.packageId = this.packageId;
    } else {
      this.toastr.error('Review type or ID not set.', 'Error');
      this.isSubmitting = false;
      return;
    }

    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.post(apiUrl, data, { headers }).subscribe({
      next: () => {
        this.toastr.success('Thanks for your feedback!', 'Submitted');
        // Redirect immediately after submit
        this.router.navigate(['/user/booking-success']);
      },
      error: () => {
        this.isSubmitting = false;
        this.toastr.error('Failed to submit review.', 'Error');
      }
    });
  }
}