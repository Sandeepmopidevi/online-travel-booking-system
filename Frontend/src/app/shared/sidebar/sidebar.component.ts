import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: false,
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Input() collapsed = false;
  isLoggedIn: boolean = false;
  userRole: string | null = null; // To store the user's role

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    // Check if there's a valid auth token in the storage
    const token = this.authService.getToken();
    if (token && !this.authService.isTokenExpired(token)) {
      this.isLoggedIn = true;
      this.userRole = this.authService.getUserRole();
    } else {
      this.isLoggedIn = false;
      this.userRole = null;
    }

    // Subscribe to the login state for real-time updates
    this.authService.isLoggedIn$.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
      if (loggedIn) {
        // Retrieve the user's role from the token or service
        this.userRole = this.authService.getUserRole();
      } else {
        this.userRole = null;
      }
    });
  }

  logout() {
    // Call the logout method from AuthService
    this.authService.logout();

    // Redirect to the login page
    this.router.navigate(['/login']);
  }
}