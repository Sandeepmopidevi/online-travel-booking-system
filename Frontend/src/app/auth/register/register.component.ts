import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: false,
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm = {
    name: '',
    email: '',
    password: '',
    role: 'Traveller',
    contactNumber: ''
  };
  submitted = false;

  constructor(private authService: AuthService, private toastr: ToastrService) {}

  markAllControlsTouched(form: any) {
    if (form && form.controls) {
      Object.values(form.controls).forEach((control: any) => {
        if (typeof control.markAsTouched === 'function') {
          control.markAsTouched();
        }
      });
    }
  }

  onSubmit(form: any) {
    this.submitted = true;
    this.markAllControlsTouched(form);

    if (form.invalid) {
      this.toastr.warning('Please fill all fields correctly.', 'Validation Error');
      return;
    }

    this.authService.register(this.registerForm).subscribe(
      (response: any) => {
        this.toastr.success('Registration successful!', 'Success');
        this.resetForm();
        this.submitted = false;
        form.resetForm();
      },
      (error) => {
        this.toastr.error('Registration failed. Please try again.', 'Error');
      }
    );
  }

  resetForm() {
    this.registerForm = {
      name: '',
      email: '',
      password: '',
      role: '',
      contactNumber: ''
    };
  }
}