import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // Import AuthService

@Component({
  standalone: false,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}

  // Handle "Get Started" button click
  onGetStarted(): void {
    if (this.authService.isLoggedIn()) {
      // If logged in, navigate to /admin/dashboard
      this.router.navigate(['/admin/dashboard']);
    } else {
      // If not logged in, navigate to /register
      this.router.navigate(['/register']);
    }
  }
}