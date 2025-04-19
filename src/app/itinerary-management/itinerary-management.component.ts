import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-itinerary-management',
  templateUrl: './itinerary-management.component.html',
  styleUrls: ['./itinerary-management.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class ItineraryManagementComponent {
  itineraries: any[] = [
    {
      name: 'Vandalur Zoo',
      details: '2 days in Vandalur covering Crocodiles, Lions, and Tigers.',
      price: 1500,
    },
    {
      name: 'Tour to Ooty',
      details: '3 days in Ooty with a visit to Botanical Gardens and Nilgiri Hills.',
      price: 3000,
    },
  ];

  customizeForm: FormGroup;
  selectedItinerary: any = null;

  constructor(private fb: FormBuilder) {
    this.customizeForm = this.fb.group({
      name: ['', Validators.required],
      details: ['', [Validators.required, Validators.minLength(10)]],
      price: ['', [Validators.required, Validators.min(1)]],
    });
  }

  customizeItinerary(itinerary: any): void {
    this.selectedItinerary = itinerary;
    this.customizeForm.setValue({
      name: itinerary.name,
      details: itinerary.details,
      price: itinerary.price,
    });
  }

  saveCustomization(): void {
    if (this.customizeForm.valid && this.selectedItinerary) {
      Object.assign(this.selectedItinerary, this.customizeForm.value);
      this.selectedItinerary = null;
      this.customizeForm.reset();
      console.log('Itinerary Updated:', this.itineraries);
    }
  }

  cancelCustomization(): void {
    this.selectedItinerary = null;
    this.customizeForm.reset();
  }
}