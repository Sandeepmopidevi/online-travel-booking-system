import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: false,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  title = 'Stayora - Embrace the Aura of Exceptional Stays';
  isLoggedIn: boolean = false;
  userRole: string | null = null;

  @Output() sidebarToggle = new EventEmitter<void>();

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    // Keep login state in sync
    this.authService.isLoggedIn$.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });

    // Always update user role on any change (immediate update after login)
    this.authService.userRole$.subscribe((role) => {
      this.userRole = role;
    });
  }

  toggleSidebar() {
    this.sidebarToggle.emit();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}