import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-customer-support',
  templateUrl: './customer-support.component.html',
  styleUrls: ['./customer-support.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class CustomerSupportComponent {
  tickets: { issue: string; description: string; status: string }[] = [];
  supportForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.supportForm = this.fb.group({
      issue: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  onSubmit(): void {
    if (this.supportForm.valid) {
      const ticket = {
        ...this.supportForm.value,
        status: 'Open',
      };
      this.tickets.push(ticket);
      this.supportForm.reset();
    }
  }

  closeTicket(index: number): void {
    this.tickets[index].status = 'Closed';
  }
}