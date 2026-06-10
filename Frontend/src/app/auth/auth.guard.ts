import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root' 
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean { 
    const token = this.authService.getToken();

    // Check if the token exists and is not expired
    if (!token || this.authService.isTokenExpired(token)) {
      this.router.navigate(['/login']); // Redirect to login if token is invalid
      return false;
    }

    // Get the required roles for the route from the route's data
    const requiredRoles = route.data['roles'] as string[];

    // Get the user's role
    const userRole = this.authService.getUserRole();

    // If roles are required for the route, check if the user's role matches
    if (requiredRoles && userRole && !requiredRoles.includes(userRole)) { // User does not have the required role
      console.warn(`Access denied - User role '${userRole}' is not authorized for this route. Required roles: ${requiredRoles.join(', ')}`);
      this.router.navigate(['/home']); // Redirect to home if user role is not authorized
      return false;
    }

    return true; // Allow access if all checks pass
  }
}