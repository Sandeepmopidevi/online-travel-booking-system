import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { BookingComponent } from './features/booking/booking.component';
import { PackagesComponent } from './features/packages/packages.component';
import { PaymentComponent } from './features/payments/payment.component';
import { ReviewsComponent } from './features/reviews/reviews.component';
import { UnauthorizedComponent } from './shared/components/unauthorized/unauthorized.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent }, // Removed AuthGuard
  { path: 'booking', component: BookingComponent }, // Removed AuthGuard
  { path: 'packages', component: PackagesComponent }, // Removed AuthGuard
  { path: 'payments', component: PaymentComponent }, // Removed AuthGuard
  { path: 'reviews', component: ReviewsComponent }, // Removed AuthGuard
  { path: 'unauthorized', component: UnauthorizedComponent },
];