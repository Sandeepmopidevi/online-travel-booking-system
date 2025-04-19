import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class ReviewsComponent {
  reviews = [
    {
      name: 'Praisy',
      rating: 5,
      date: '2025-04-15',
      comment: 'Excellent service! The staff was very friendly and the food was amazing.',
    },
    {
      name: 'Sandeep',
      rating: 4,
      date: '2025-04-10',
      comment: 'Great experience overall. The ambiance was perfect, and the food was delicious.',
    },
    {
      name: 'Vishal',
      rating: 3,
      date: '2025-04-05',
      comment: 'The food was decent, but the service could have been better.',
    },
  ];
}