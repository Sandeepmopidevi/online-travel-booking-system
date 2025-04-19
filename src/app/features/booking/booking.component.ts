import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  animations: [
    trigger('fadeIn', [
      state('void', style({ opacity: 0 })),
      transition(':enter', [animate('700ms ease-in')]),
    ]),
    trigger('buttonHover', [
      state('default', style({ transform: 'scale(1)', backgroundColor: '#007BFF', color: 'white' })),
      state('hovered', style({ transform: 'scale(1.1)', backgroundColor: '#0056b3' })),
      transition('default <=> hovered', [animate('300ms ease-in-out')]),
    ]),
  ],
})
export class BookingComponent {
  bookingForm: FormGroup;
  submitted = false;
  buttonState = 'default';

  constructor(private fb: FormBuilder, private router: Router) {
    this.bookingForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      bookingDate: ['', Validators.required],
      bookingTime: ['', Validators.required],
      guests: ['', [Validators.required, Validators.min(1)]],
    });
  }

  // Getter for easy access to form controls
  get f() {
    return this.bookingForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.bookingForm.invalid) {
      return;
    }

    // Simulating form submission
    console.log('Booking Successful:', this.bookingForm.value);
    alert('Thank you for your reservation! We look forward to serving you.');

    // Navigate to a confirmation page
    this.router.navigate(['/confirmation']);
  }

  onReset(): void {
    this.submitted = false;
    this.bookingForm.reset();
  }
}