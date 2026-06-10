import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PackageService } from '../../services/package.service';
import { AuthService } from '../../services/auth.service';
import { Package } from '../../models/package.model';

@Component({
  standalone: false,
  selector: 'app-packages-buy',
  templateUrl: './packages-buy.component.html',
  styleUrls: ['./packages-buy.component.css']
})
export class PackagesBuyComponent implements OnInit {
  packages: Package[] = [];
  userId: number = 0;
  isLoading: boolean = false;
  isRedirecting: boolean = false;

  constructor(
    private packageService: PackageService,
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.fetchUserIdAndLoadPackages();
  }

  /**
   * Fetch user id and then load packages
   */
  private fetchUserIdAndLoadPackages(): void {
    const token = this.authService.getToken();
    if (!token || this.authService.isTokenExpired(token)) {
      this.toastr.error('Your session has expired. Please log in again.', 'Session Expired');
      this.authService.logout();
      this.router.navigate(['/login']);
      return;
    }

    this.authService.getUserIdByEmail().subscribe({
      next: (id) => {
        this.userId = id;
        this.loadPackages();
      },
      error: (err) => {
        console.error('Failed to get userId:', err);
        if (err.status === 403) {
          this.toastr.error('You do not have permission to access this resource.', 'Access Denied');
        } else if (err.status === 401) {
          this.toastr.error('Unauthorized access. Please log in again.', 'Unauthorized');
          this.authService.logout();
          this.router.navigate(['/login']);
        } else {
          this.toastr.error('Could not determine user identity. Please try again.', 'Error');
        }
      }
    });
  }

  /**
   * Load all travel packages
   */
  private loadPackages(): void {
    this.isLoading = true;
    this.packageService.getPackages().subscribe({
      next: (data: Package[]) => {
        this.packages = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Package fetch error:', err);
        this.isLoading = false;
        if (err.status === 403) {
          this.toastr.error('You do not have permission to access this resource.', 'Access Denied');
        } else if (err.status === 401) {
          this.toastr.error('Unauthorized access. Please log in again.', 'Unauthorized');
          this.authService.logout();
          this.router.navigate(['/login']);
        } else {
          this.toastr.error('Failed to load packages. Please try again later.', 'Error');
        }
      }
    });
  }

  /**
   * Redirect to payment page with package details
   * @param pkg Package object
   */
  navigateToPayment(pkg: Package): void {
    if (!pkg || !this.userId) return;
    this.isRedirecting = true;
    this.toastr.info(`Redirecting to payment for ${pkg.name}.`, 'Payment Info');
    this.router.navigate(['/user/payment'], {
      queryParams: {
        amount: pkg.price,
        packageID: pkg.packageID,
        userID: this.userId
      }
    });
  }
}