import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const requiredRole = route.data['role'];
    const currentUser = this.authService.getCurrentUser();

    console.log('Current User:', currentUser); // Debugging log
    console.log('Required Role:', requiredRole); // Debugging log

    if (currentUser && currentUser.role === requiredRole) {
      return true;
    }

    this.router.navigate(['/unauthorized']);
    return false;
  }
}