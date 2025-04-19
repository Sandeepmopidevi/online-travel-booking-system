import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class DashboardComponent implements OnInit {
  title: string = 'Dashboard Overview';
  isSidebarCollapsed: boolean = false;

  stats = [
    { label: 'Total Bookings', count: 123, current: 0 },
    { label: 'Pending Payments', count: 45, current: 0 },
    { label: 'New Reviews', count: 15, current: 0 },
  ];

  recentActivities = [
    'Booking #456 confirmed',
    'Payment for Booking #123 received',
    'New review added for Package #789',
  ];

  ngOnInit(): void {
    this.animateCounters();
  }

  toggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  animateCounters(): void {
    this.stats.forEach((stat) => {
      const increment = Math.ceil(stat.count / 100); // Controls the speed of counting
      const interval = setInterval(() => {
        stat.current += increment;
        if (stat.current >= stat.count) {
          stat.current = stat.count; // Ensures the counter stops at the exact value
          clearInterval(interval);
        }
      }, 10); 
    });
  }
}