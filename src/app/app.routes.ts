import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { BookingComponent } from './features/booking/booking.component';
import { PackagesComponent } from './features/packages/packages.component';
import { PaymentComponent } from './features/payments/payment.component';
import { ReviewsComponent } from './features/reviews/reviews.component';
import { UnauthorizedComponent } from './shared/components/unauthorized/unauthorized.component';
//import { AuthGuard } from './core/guards/';
//import { RoleGuard } from './core/guards/role.guard';
import { SearchComponent } from './search/search.component';
import { ResultsComponent } from './results/results.component';
import { BookingConfirmationComponent } from './booking-confirmation/booking-confirmation.component';
export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent }, 
  { path: 'booking', component: BookingComponent }, 
  { path: 'packages', component: PackagesComponent }, 
  { path: 'payments', component: PaymentComponent }, 
  { path: 'reviews', component: ReviewsComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },
  {path: 'search', component: SearchComponent}, // Added SearchComponent route
  {path: 'results', component: ResultsComponent}, // Added ResultsComponent route
  {path: 'booking-confirmation', component: BookingConfirmationComponent}, // Added BookingConfirmationComponent route
];