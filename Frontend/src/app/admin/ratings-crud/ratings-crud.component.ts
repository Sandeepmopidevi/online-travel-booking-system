import { Component, OnInit } from '@angular/core';
import { RatingService } from '../../services/rating.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Review } from '../../models/review.model';

@Component({
  standalone: false,
  selector: 'app-ratings-crud',
  templateUrl: './ratings-crud.component.html',
  styleUrls: ['./ratings-crud.component.css']
})
export class RatingsCrudComponent implements OnInit {
  reviews: Review[] = [];
  loading = false;
  error = '';
  filterType: string = 'All';
  editMode: boolean = false;
  editReview: Review | null = null;
  reviewForm: FormGroup;

  constructor(
    private ratingService: RatingService,
    private fb: FormBuilder
  ) {
    this.reviewForm = this.fb.group({
      type: ['Hotel'],
      id: [null],
      rating: [0],
      comment: [''],
      userID: [''],
      hotelId: [null],
      packageId: [null],
      flightId: [null]
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): void {
    this.loading = true;
    this.error = '';
    Promise.all([
      this.ratingService.getHotelReviews().toPromise(),
      this.ratingService.getPackageReviews().toPromise(),
      this.ratingService.getFlightReviews().toPromise(),
    ])
      .then(([hotelReviews, packageReviews, flightReviews]) => {
        let all: Review[] = [];
        // Get the correct id for each review object
        if (hotelReviews) {
          all = all.concat((hotelReviews as any[]).map(r => ({ ...r, id: r.hotelReviewId || r.id, type: 'Hotel' })));
        }
        if (packageReviews) {
          all = all.concat((packageReviews as any[]).map(r => ({ ...r, id: r.packageReviewId || r.id, type: 'Package' })));
        }
        if (flightReviews) {
          all = all.concat((flightReviews as any[]).map(r => ({ ...r, id: r.flightReviewId || r.id, type: 'Flight' })));
        }
        all.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        this.reviews = all;
        this.loading = false;
      })
      .catch(() => {
        this.error = 'Failed to load reviews.';
        this.loading = false;
      });
  }

  filteredReviews(): Review[] {
    if (this.filterType === 'All') return this.reviews;
    return this.reviews.filter(r => r.type === this.filterType);
  }

  startEdit(review: Review) {
    this.editMode = true;
    this.editReview = review;
    this.reviewForm.patchValue({ ...review });
  }

  cancelEdit() {
    this.editMode = false;
    this.editReview = null;
    this.reviewForm.reset({ type: 'Hotel', rating: 0 });
  }

  submitForm() {
    const form = this.reviewForm.value;
    if (this.editMode && this.editReview) {
      // UPDATE
      this.updateReview(this.editReview, form);
    } else {
      // CREATE
      this.createReview(form);
    }
  }

  createReview(form: any) {
    let obs;
    let data: any = {
      rating: form.rating,
      comment: form.comment,
      timestamp: new Date().toISOString(),
      userID: form.userID
    };
    if (form.type === 'Hotel') {
      data.hotelId = form.hotelId;
      obs = this.ratingService.createHotelReview(data);
    } else if (form.type === 'Package') {
      data.packageId = form.packageId;
      obs = this.ratingService.createPackageReview(data);
    } else if (form.type === 'Flight') {
      data.flightId = form.flightId;
      obs = this.ratingService.createFlightReview(data);
    } else {
      return;
    }
    obs.subscribe({
      next: () => {
        this.cancelEdit();
        this.loadAll();
      },
      error: () => {
        this.error = 'Failed to create review.';
      }
    });
  }

  updateReview(review: Review, form: any) {
    let obs;
    let data: any = {
      rating: form.rating,
      comment: form.comment,
      timestamp: form.timestamp || new Date().toISOString(),
      userID: form.userID
    };
    if (!review.reviewId) {
      this.error = 'Review ID missing - cannot update!';
      return;
    }
    if (form.type === 'Hotel') {
      obs = this.ratingService.updateHotelReview(review.reviewId, data);
    } else if (form.type === 'Package') {
      obs = this.ratingService.updatePackageReview(review.reviewId, data);
    } else if (form.type === 'Flight') {
      obs = this.ratingService.updateFlightReview(review.reviewId, data);
    } else {
      return;
    }
    obs.subscribe({
      next: () => {
        this.cancelEdit();
        this.loadAll();
      },
      error: () => {
        this.error = 'Failed to update review.';
      }
    });
  }

  deleteReview(review: Review) {
    let obs;
    if (!review.reviewId) {
      this.error = 'Review ID missing - cannot delete!';
      return;
    }
    if (review.type === 'Hotel') {
      obs = this.ratingService.deleteHotelReview(review.reviewId);
    } else if (review.type === 'Package') {
      obs = this.ratingService.deletePackageReview(review.reviewId);
    } else if (review.type === 'Flight') {
      obs = this.ratingService.deleteFlightReview(review.reviewId);
    } else {
      return;
    }
    obs.subscribe({
      next: () => this.loadAll(),
      error: () => this.error = 'Failed to delete review.'
    });
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