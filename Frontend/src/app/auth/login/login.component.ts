import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: false,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = {
    email: '',
    password: ''
  };
  submitted = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  // Ensure all controls are marked as touched
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
      this.showToastr('Please fill in all fields correctly.', 'Warning', 'warning');
      return;
    }
    this.authService.login(this.loginForm).subscribe(
      (response: any) => {
        sessionStorage.setItem('token', response.token);
        this.showToastr('Login successful!', 'Success', 'success');
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error('Login error:', error);
        this.showToastr('Invalid email or password.', 'Login Failed', 'error');
      }
    );
  }

  private showToastr(message: string, title: string, type: 'success' | 'error' | 'warning') {
    if (type === 'success') {
      this.toastr.success(message, title);
    } else if (type === 'error') {
      this.toastr.error(message, title);
    } else if (type === 'warning') {
      this.toastr.warning(message, title);
    }
  }
}