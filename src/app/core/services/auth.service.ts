import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private router: Router) {}

  login(user: User) {
    // Mock login logic (replace with actual API call)
    const loggedInUser = { ...user, role: user.role }; // Assign role dynamically
    this.currentUserSubject.next(loggedInUser);
    localStorage.setItem('user', JSON.stringify(loggedInUser));
  }

  logout() {
    this.currentUserSubject.next(null);
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  getCurrentUser(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  hasRole(role: string): boolean {
    const user = this.getCurrentUser();
    return user?.role === role;
  }
}