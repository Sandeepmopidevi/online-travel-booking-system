import { Component, OnInit } from '@angular/core';
import { RatingService } from '../../services/rating.service';
import { AuthService } from '../../services/auth.service';

interface Review {
  rating: number;
  comment: string;
  timestamp: string;
  userID?: number;
  hotelId?: number;
  packageId?: number;
  flightId?: number;
  [key: string]: any;
  type?: string; // 'Hotel', 'Package', 'Flight'
}
@Component({
  standalone: false,
  selector: 'app-view-reviews',
  templateUrl: './view-reviews.component.html',
  styleUrls: ['./view-reviews.component.css']
})
export class ViewReviewsComponent implements OnInit {
  reviews: Review[] = [];
  loading = false;
  error = '';
  filterType: string = 'All';
  userRole: string = '';

  constructor(
    private ratingService: RatingService,
    private authService: AuthService // <-- Inject AuthService
  ) {}

  ngOnInit(): void {
    // Get role from AuthService (never from sessionStorage directly)
    this.userRole = this.authService.getUserRole() || 'Admin';
    if (this.userRole === 'Hotel Manager') {
      this.fetchHotelReviews();
    } else {
      this.fetchAllReviews();
    }
  }

  fetchAllReviews(): void {
    // Only for Admin; never called for Hotel Manager
    this.loading = true;
    this.error = '';
    Promise.all([
      this.ratingService.getHotelReviews().toPromise(),
      this.ratingService.getPackageReviews().toPromise(),
      this.ratingService.getFlightReviews().toPromise(),
    ])
      .then(([hotelReviews, packageReviews, flightReviews]) => {
        let all: Review[] = [];
        if (hotelReviews) all = all.concat((hotelReviews as any[]).map(r => ({ ...r, type: 'Hotel' })));
        if (packageReviews) all = all.concat((packageReviews as any[]).map(r => ({ ...r, type: 'Package' })));
        if (flightReviews) all = all.concat((flightReviews as any[]).map(r => ({ ...r, type: 'Flight' })));
        all.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        this.reviews = all;
        this.loading = false;
      })
      .catch(() => {
        this.error = 'Failed to load reviews. (Are you logged in as Admin?)';
        this.loading = false;
      });
  }

  fetchHotelReviews(): void {
    // For Hotel Manager (and can also be used by Admin for just hotel reviews)
    this.loading = true;
    this.error = '';
    this.ratingService.getHotelReviews().toPromise()
      .then((hotelReviews: any) => {
        let all: Review[] = [];
        if (hotelReviews) all = (hotelReviews as any[]).map(r => ({ ...r, type: 'Hotel' }));
        all.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        this.reviews = all;
        this.loading = false;
      })
      .catch(() => {
        this.error = 'Failed to load hotel reviews. (Are you logged in as Hotel Manager?)';
        this.loading = false;
      });
  }

  filteredReviews(): Review[] {
    if (this.userRole === 'Hotel Manager') return this.reviews;
    if (this.filterType === 'All') return this.reviews;
    return this.reviews.filter(r => r.type === this.filterType);
  }

  getTypeColor(type: string | undefined): string {
    switch (type) {
      case 'Hotel':
        return '#21b573';
      case 'Package':
        return '#2065d1';
      case 'Flight':
        return '#ff6bcb';
      default:
        return '#444';
    }
  }
}