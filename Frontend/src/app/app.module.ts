import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './components/about/about.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { GithubComponent } from './components/github/github.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { BookingsComponent } from './admin/bookings/bookings.component';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';
import { HotelManagementComponent } from './admin/hotel-management/hotel-management.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { PackageComponent } from './admin/package/package.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlightsComponent } from './admin/flights/flights.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { HotelsComponent } from './users/hotels/hotels.component';
import { BookingComponent } from './users/booking/booking.component';
import { PaymentComponent } from './users/payment/payment.component';
import { BookingSuccessComponent } from './users/booking-success/booking-success.component';
import { InvoiceComponent } from './users/invoice/invoice.component';
import { UserComponent } from './users/user/user.component';
import { MailServerComponent } from './admin/mail-server/mail-server.component';
import { ContactComponent } from './admin/contact-us/contact-us.component';
import { ViewReviewsComponent } from './admin/view-reviews/view-reviews.component';
import { ItineraryComponent } from './users/itinerary/itinerary.component';
import { FlightBookComponent } from './users/flight-book/flight-book.component';
import { PackagesBuyComponent } from './users/packages-buy/packages-buy.component';
import { SupportTicketCrudComponent } from './admin/support-ticket-crud/support-ticket-crud.component';
import { SupportTicketComponent } from './users/support-ticket/support-ticket.component';
import { ItineraryCrudComponent } from './admin/itinerary-crud/itinerary-crud.component';
import { RatingPromptComponent } from './users/rating-prompt/rating-prompt.component';
import { RatingsCrudComponent } from './admin/ratings-crud/ratings-crud.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    ContactUsComponent,
    GithubComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    BookingsComponent,
    AdminUsersComponent,
    HotelManagementComponent,
    SidebarComponent,
    PackageComponent,
    FlightsComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    HotelsComponent,
    BookingComponent,
    PaymentComponent,
    BookingSuccessComponent,
    InvoiceComponent,
    UserComponent,
    MailServerComponent,
    ContactComponent,
    ViewReviewsComponent,
    ItineraryComponent,
    FlightBookComponent,
    PackagesBuyComponent,
    SupportTicketCrudComponent,
    SupportTicketComponent,
    ItineraryCrudComponent,
    RatingPromptComponent,
    RatingsCrudComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: "toast-top-center",
      preventDuplicates: true,
      progressBar: true,
      closeButton: true,
    })
  ],
  providers: [provideHttpClient(withInterceptorsFromDi())],
  bootstrap: [AppComponent]
})
export class AppModule { }
