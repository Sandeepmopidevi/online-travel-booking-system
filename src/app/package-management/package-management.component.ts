import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-package-management',
  templateUrl: './package-management.component.html',
  styleUrls: ['./package-management.component.css'],
  standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
})
export class PackageManagementComponent {
  packageForm: FormGroup;
  packages: any[] = []; // List of created packages

  constructor(private fb: FormBuilder) {
    this.packageForm = this.fb.group({
      packageName: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: ['', [Validators.required, Validators.min(1)]],
      hotels: ['', Validators.required],
      flights: ['', Validators.required],
      activities: [''],
    });
  }

  onCreatePackage(): void {
    if (this.packageForm.valid) {
      this.packages.push(this.packageForm.value);
      this.packageForm.reset();
      console.log('Package Created:', this.packages);
    }
  }
}