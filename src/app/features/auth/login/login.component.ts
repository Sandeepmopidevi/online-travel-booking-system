import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  animations: [
    trigger('fadeIn', [
      state('void', style({ opacity: 0 })),
      transition(':enter', [animate('500ms ease-in')]),
    ]),
    trigger('buttonHover', [
      state('default', style({ transform: 'scale(1)', backgroundColor: '#007BFF', color: 'white' })),
      state('hovered', style({ transform: 'scale(1.05)', backgroundColor: '#0056b3' })),
      transition('default <=> hovered', [animate('300ms ease-in-out')]),
    ]),
  ],
})
export class LoginComponent {
  loginForm: FormGroup;
  buttonState = 'default';

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      alert('Login Successful!');
      this.router.navigate(['/dashboard']);
    } else {
      alert('Please fill in the form correctly.');
    }
  }
}