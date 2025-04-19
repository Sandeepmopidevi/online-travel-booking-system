import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-booking-confirmation',
  templateUrl: './booking-confirmation.component.html',
  styleUrls: ['./booking-confirmation.component.css'],
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
})
export class BookingConfirmationComponent {
  @Input() bookingDetails: any; // Input from ResultsComponent

  proceedToPayment(): void {
    console.log('Proceeding to Payment:', this.bookingDetails);
    // Redirect or emit data to PaymentComponent
  }
}