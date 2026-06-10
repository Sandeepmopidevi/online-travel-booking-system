import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PaymentService } from '../../services/payment.service';
import { BookingService } from '../../services/booking.service';
import { AuthService } from '../../services/auth.service';
import { Booking } from '../../models/booking.model';

@Component({
  standalone: false,
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit, OnDestroy {
  paymentMethod: string = '';
  userId: number = 0;
  amount: number = 0;
  hotelID?: number;
  packageID?: number;
  flightID?: number;
  type: string = ''; // 'Hotel', 'Package', or 'Flight'
  cardNumber: string = '';
  cvv: string = '';
  expiryMonth: string = '';
  expiryYear: string = '';
  upiId: string = 'sandeepmopidev1@ybl';
  timer: number = 90;
  isCardValid: boolean = false;
  selectedPaymentMessage: string = '';
  countdownInterval: any;
  isProcessing: boolean = false;

  // For rating prompt
  showRatingPrompt: boolean = false;
  lastBookingId?: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private paymentService: PaymentService,
    private bookingService: BookingService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.hotelID = params['hotelID'] ? Number(params['hotelID']) : undefined;
      this.packageID = params['packageID'] ? Number(params['packageID']) : undefined;
      this.flightID = params['flightID'] ? Number(params['flightID']) : undefined;
      if (this.hotelID) {
        this.type = 'Hotel';
      } else if (this.packageID) {
        this.type = 'Package';
      } else if (this.flightID) {
        this.type = 'Flight';
      } else {
        this.type = params['type'] || 'Hotel';
      }

      const amountParam = Number(params['amount']);
      if (!isNaN(amountParam)) {
        this.amount = amountParam;
      } else {
        this.toastr.error('Invalid amount in query params. Redirecting to hotels.', 'Error');
        this.router.navigate(['/hotels']);
      }
    });

    this.fetchUserId();
    this.startCountdown();
  }

  ngOnDestroy(): void {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  }

  fetchUserId(): void {
    this.authService.getUserIdByEmail().subscribe({
      next: (userId: number) => {
        this.userId = userId;
      },
      error: () => {
        this.toastr.error('Failed to fetch your user ID. Redirecting to login.', 'Error');
        this.router.navigate(['/login']);
      }
    });
  }

  selectPaymentMethod(method: string): void {
    this.paymentMethod = method;
    this.selectedPaymentMessage = `You selected: ${method}`;
    this.toastr.info(`Payment method selected: ${method}`, 'Payment Method');
  }

  startCountdown(): void {
    this.countdownInterval = setInterval(() => {
      if (this.timer > 0) {
        this.timer--;
      } else {
        clearInterval(this.countdownInterval);
        this.toastr.warning('Payment time expired. Redirecting to hotels.', 'Time Expired');
        this.router.navigate(['/hotels']);
      }
    }, 1000);
  }

  validateCardDetails(): void {
    const cardNumberValid = /^\d{16}$/.test(this.cardNumber);
    const cvvValid = /^\d{3}$/.test(this.cvv);
    const expiryMonthValid = /^(0[1-9]|1[0-2])$/.test(this.expiryMonth);
    const expiryYearValid =
      /^\d{4}$/.test(this.expiryYear) &&
      parseInt(this.expiryYear, 10) >= new Date().getFullYear();

    this.isCardValid = cardNumberValid && cvvValid && expiryMonthValid && expiryYearValid;

    if (!this.isCardValid) {
      this.toastr.error('Invalid card details. Please enter valid details.', 'Card Validation');
    }
  }

  processPayment(): void {
    if (this.isProcessing) return;
    if (!this.paymentMethod) {
      this.toastr.warning('Please select a payment method before proceeding.', 'Warning');
      return;
    }

    if (this.paymentMethod === 'Credit' || this.paymentMethod === 'Debit') {
      this.validateCardDetails();
      if (!this.isCardValid) return;
    }

    this.isProcessing = true;

    // Only send fields backend expects!
    const bookingPayload: any = {
      userId: this.userId,
      type: this.type,
      status: 'Confirmed',
      paymentId: 0
    };

    this.bookingService.createBooking(bookingPayload).subscribe({
      next: (response: any) => {
        // Accept both BookingId (backend) and bookingID/bookingId (fallback)
        const bookingId = response?.BookingId || response?.bookingID || response?.bookingId;
        if (!bookingId || typeof bookingId !== 'number') {
          this.isProcessing = false;
          this.toastr.warning('Booking succeeded, but failed to get booking ID from backend.', 'Partial Success');
          // Optionally, you can proceed or block further steps here.
          return;
        }
        this.lastBookingId = bookingId;
        this.createPaymentForBooking(this.lastBookingId);
      },
      error: () => {
        this.isProcessing = false;
        this.toastr.error('Booking creation failed. Please contact support.', 'Booking Error');
      }
    });
  }

  private createPaymentForBooking(bookingID: number): void {
    const paymentPayload = {
      bookingId: bookingID,
      userId: this.userId,
      amount: this.amount,
      status: 'Processing',
      paymentMethod: this.paymentMethod
    };

    this.paymentService.createPayment(paymentPayload).subscribe({
      next: () => {
        this.isProcessing = false;
        this.showRatingPrompt = true;
        setTimeout(() => {
          const el = document.getElementById('rating-prompt');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 200);
      },
      error: () => {
        this.isProcessing = false;
        this.toastr.error('Payment failed. Please contact support.', 'Payment Error');
      }
    });
  }
}