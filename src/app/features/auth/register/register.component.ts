import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router'; // Added for navigation
import { CommonModule } from '@angular/common'; // Added for standalone components
import { ReactiveFormsModule } from '@angular/forms'; // Added for reactive forms
import { trigger, state, style, transition, animate } from '@angular/animations'; // Added for animations

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  animations: [
    trigger('fadeIn', [
      state('void', style({ opacity: 0 })),
      transition(':enter', [animate('500ms ease-in')]),
    ]),
    trigger('buttonHover', [
      state('default', style({ transform: 'scale(1)', backgroundColor: '#28a745', color: 'white' })),
      state('hovered', style({ transform: 'scale(1.05)', backgroundColor: '#218838' })),
      transition('default <=> hovered', [animate('300ms ease-in-out')]),
    ]),
  ],
})
export class RegisterComponent {
  registerForm: FormGroup;
  submitted = false;
  buttonState = 'default';

  constructor(private formBuilder: FormBuilder, private router: Router) {
    // Initialize the form with validation
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  // Custom getter for easy access to form controls
  get f(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }

  // On form submit
  onSubmit(): void {
    this.submitted = true;

    // Stop if the form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    // Simulate form data submission
    console.log('Registration Successful', this.registerForm.value);
    alert('Registration Successful');

    // Navigate to the login page after successful registration
    this.router.navigate(['/login']);
  }

  // Reset the form
  onReset(): void {
    this.submitted = false;
    this.registerForm.reset();
  }
}