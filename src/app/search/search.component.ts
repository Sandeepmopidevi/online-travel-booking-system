import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
})
export class SearchComponent {
  searchForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      searchType: ['hotel', Validators.required], // hotel, flight, or package
      location: ['', Validators.required],
      checkInDate: ['', Validators.required],
      checkOutDate: [''],
      travelers: ['', [Validators.required, Validators.min(1)]],
    });
  }

  onSearch(): void {
    if (this.searchForm.valid) {
      console.log('Search Query:', this.searchForm.value);
      // Emit search query to ResultsComponent
    }
  }
}