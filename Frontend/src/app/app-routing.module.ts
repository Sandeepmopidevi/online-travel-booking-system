import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Component Imports
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';
import { AboutComponent } from './components/about/about.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { GithubComponent } from './components/github/github.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

// Admin Imports
import { BookingsComponent } from './admin/bookings/bookings.component';
import { HotelManagementComponent } from './admin/hotel-management/hotel-management.component';
import { PackageComponent } from './admin/package/package.component';
import { FlightsComponent } from './admin/flights/flights.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ContactComponent } from './admin/contact-us/contact-us.component';
import { SupportTicketCrudComponent } from './admin/support-ticket-crud/support-ticket-crud.component';
import { ItineraryCrudComponent } from './admin/itinerary-crud/itinerary-crud.component';
import { ViewReviewsComponent } from './admin/view-reviews/view-reviews.component';
import { MailServerComponent } from './admin/mail-server/mail-server.component';
import { RatingsCrudComponent} from './admin/ratings-crud/ratings-crud.component';

// User Imports
import { HotelsComponent } from './users/hotels/hotels.component';
import { BookingComponent } from './users/booking/booking.component';
import { PaymentComponent } from './users/payment/payment.component';
import { BookingSuccessComponent } from './users/booking-success/booking-success.component';
import { InvoiceComponent } from './users/invoice/invoice.component';
import { UserComponent } from './users/user/user.component';
import { ItineraryComponent } from './users/itinerary/itinerary.component';
import { FlightBookComponent } from './users/flight-book/flight-book.component';
import { PackagesBuyComponent } from './users/packages-buy/packages-buy.component';
import { SupportTicketComponent } from './users/support-ticket/support-ticket.component';

// Auth Guard Import
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  // Public Routes
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'about', component: AboutComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {path: 'not-found', component: NotFoundComponent},

  {
    path: 'admin',
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] }, // Only Admin can access these routes
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'bookings', component: BookingsComponent },
      { path: 'users', component: AdminUsersComponent },
      { path: 'hotels', component: HotelManagementComponent },
      { path: 'packages', component: PackageComponent },
      { path: 'flights', component: FlightsComponent },
      { path: 'github', component: GithubComponent },
      { path: 'contact-us', component: ContactComponent },
      { path: 'mail-server', component: MailServerComponent },
      {path: 'support-tickets', component: SupportTicketCrudComponent},
      {path: 'itinerary', component: ItineraryCrudComponent},
      {path: 'view-reviews', component: ViewReviewsComponent},
      {path: 'ratings', component: RatingsCrudComponent},

    ]
  },
  {
    path: 'user',
    canActivate: [AuthGuard],
    data: { roles: ['Traveller'] }, // Only Traveller can access these routes
    children: [
      { path: 'hotels', component: HotelsComponent }, // List of hotels
      {path: 'flight-book', component: FlightBookComponent}, // Flight booking page
      { path: 'bookings', component: BookingComponent }, // Booking management
      { path: 'payment', component: PaymentComponent }, // Payment page
      { path: 'invoice', component: InvoiceComponent }, // Invoice page
      { path: 'user', component: UserComponent }, // User profile page
      {path: 'itinerary', component: ItineraryComponent},
      {path: 'packages' , component: PackagesBuyComponent},
      {path: 'booking-success', component: BookingSuccessComponent},
      {path: 'support-ticket', component: SupportTicketComponent},
    ]
  },
  {
    path: 'hotel-manager',
    canActivate: [AuthGuard],
    data: { roles: ['Hotel Manager'] },
    children: [
      {path: 'hotels', component: HotelManagementComponent},
      {path: 'hotel-review', component: ViewReviewsComponent},
    ]
  },
  {
    path: 'travel-agent',
    canActivate: [AuthGuard],
    data: { roles: ['Travel Agent'] },
    children: [
      {path: 'packages', component: PackageComponent},
      {path: 'itinerary', component: ItineraryCrudComponent},
    ]
  },
  { path: '**', redirectTo: '/not-found', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }