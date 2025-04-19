import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
  standalone:true,
  imports:[CommonModule, ReactiveFormsModule],
})
export class ResultsComponent {
  @Input() results: any[] = []; // Input from SearchComponent
  @Input() searchType: string = ''; // hotel, flight, or package

  onBook(item: any): void {
    console.log('Booking Item:', item);
    // Emit booking details to BookingConfirmationComponent
  }
}