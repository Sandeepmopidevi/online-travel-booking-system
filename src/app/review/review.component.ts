import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class ReviewComponent {
  reviews: { rating: number; comment: string }[] = [];
  averageRating: number = 0;
  reviewForm: FormGroup;
  selectedRating: number = 0;

  constructor(private fb: FormBuilder) {
    this.reviewForm = this.fb.group({
      rating: [null, [Validators.required]],
      comment: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  setRating(rating: number): void {
    this.selectedRating = rating;
    this.reviewForm.get('rating')?.setValue(rating);
  }

  onSubmit(): void {
    if (this.reviewForm.valid) {
      const review = this.reviewForm.value;
      this.reviews.push(review);
      this.updateAverageRating();
      this.reviewForm.reset();
      this.selectedRating = 0; // Reset the star selection
    }
  }

  updateAverageRating(): void {
    const total = this.reviews.reduce((sum, review) => sum + review.rating, 0);
    this.averageRating = total / this.reviews.length;
  }
}