import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr'; // Import ToastrService
import { DashboardService } from '../../../app/services/dashboard.service';

@Component({
  standalone: false,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  totalBookings!: number;
  totalFlights!: number;
  totalHotels!: number;
  totalPackages!: number;
  totalItineraries!: number;
  totalUsers!: number;

  loading = true;

  constructor(
    private dashboardService: DashboardService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    // Fetch all counts
    this.dashboardService.getAllCounts().subscribe({
      next: (counts) => {
        this.totalBookings = counts.totalBookings;
        this.totalFlights = counts.totalFlights;
        this.totalHotels = counts.totalHotels;
        this.totalPackages = counts.totalPackages;
        this.totalItineraries = counts.totalItineraries;
        this.totalUsers = counts.totalUsers;

        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading dashboard data:', error);
        this.loading = false;
        this.toastr.error('Failed to load dashboard data. Please try again.', 'Error');
      }
    });
  }
}