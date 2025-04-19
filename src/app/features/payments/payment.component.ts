import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class PaymentComponent {
  paymentForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {
    this.paymentForm = this.fb.group({
      cardNumber: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{16}$')],
      ],
      cardHolder: ['', [Validators.required, Validators.minLength(3)]],
      expirationDate: [
        '',
        [Validators.required, Validators.pattern('(0[1-9]|1[0-2])/(\\d{2})')],
      ],
      cvv: ['', [Validators.required, Validators.pattern('^[0-9]{3}$')]],
    });
  }

  // Getter for easy access to form controls
  get f() {
    return this.paymentForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.paymentForm.invalid) {
      return;
    }

    // Simulate payment processing
    console.log('Payment Successful:', this.paymentForm.value);
    alert('Your payment was successful!');
  }

  onReset(): void {
    this.submitted = false;
    this.paymentForm.reset();
  }
}