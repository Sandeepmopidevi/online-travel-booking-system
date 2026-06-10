## Angular Sidebar Component - Line-by-Line Explanation

### sidebar.component.ts

```ts
import { Component, Input, OnInit } from '@angular/core';
```

* **Imports decorators and interfaces** from Angular core to define the component and its behavior.

```ts
import { Router } from '@angular/router';
```

* **Used for navigation** between routes programmatically.

```ts
import { AuthService } from '../../services/auth.service';
```

* Imports a custom service for **authentication and role management**.

```ts
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
```

* Declares the component metadata: **selector**, **template path**, and **style path**.

```ts
export class SidebarComponent implements OnInit {
```

* Defines the SidebarComponent class.

```ts
  @Input() collapsed = false;
```

* Accepts a boolean input to **toggle collapsed view** of the sidebar.

```ts
  isLoggedIn: boolean = false;
  userRole: string | null = null;
```

* Tracks **login status** and **user role**.

```ts
  constructor(private router: Router, private authService: AuthService) {}
```

* Injects `Router` and `AuthService` for routing and authentication control.

```ts
  ngOnInit(): void {
```

* Lifecycle hook that runs when the component initializes.

```ts
    const token = this.authService.getToken();
```

* Fetches the **JWT token** from storage.

```ts
    if (token && !this.authService.isTokenExpired(token)) {
```

* Checks if the token is **valid and not expired**.

```ts
      this.isLoggedIn = true;
      this.userRole = this.authService.getUserRole();
```

* Sets login status and retrieves user role.

```ts
    } else {
      this.isLoggedIn = false;
      this.userRole = null;
    }
```

* Clears status if token is invalid.

```ts
    this.authService.isLoggedIn$.subscribe((loggedIn) => {
```

* Subscribes to the **login state observable** for real-time updates.

```ts
      this.isLoggedIn = loggedIn;
```

* Updates local status when observable emits changes.

```ts
      if (loggedIn) {
        this.userRole = this.authService.getUserRole();
      } else {
        this.userRole = null;
      }
    });
  }
```

* Keeps the sidebar UI synced with authentication state.

```ts
  logout() {
```

* Handles logout functionality.

```ts
    this.authService.logout();
    this.router.navigate(['/login']);
  }
```

* Clears auth info and redirects to login page.

---

### sidebar.component.html

```html
<div class="sidebar" [class.collapsed]="collapsed">
```

* Applies `collapsed` class if the input is true.

```html
  <ul>
    <br>
```

* Starts the menu list with a line break.

```html
<ng-container *ngIf="userRole === 'Admin'">
```

* Checks if logged in user is an **Admin** to show admin links.

(Each list item inside has an icon, routerLink, and visible label. Similar logic applies to Traveller, Hotel Manager, and Travel Agent roles.)

```html
<ng-container *ngIf="userRole === 'Traveller'"> ... </ng-container>
<ng-container *ngIf="userRole === 'Hotel Manager'"> ... </ng-container>
<ng-container *ngIf="userRole === 'Travel Agent'"> ... </ng-container>
```

* Each container displays menu items specific to user roles.

```html
<div class="logout-section text-center mt-4" *ngIf="isLoggedIn">
  <button class="btn btn-danger clickable d-flex align-items-center justify-content-center" (click)="logout()">
    <i class="fas fa-sign-out-alt"></i>
    <span class="sidebar-text ms-2">Logout</span>
  </button>
</div>
```

* Shows a **logout button** when the user is logged in.

---

## Interview Questions and Answers

### Q1: What is the purpose of `@Input()` in Angular?

**A:** It allows a parent component to bind data to a child component.

### Q2: How is role-based routing implemented in this component?

**A:** By using `ngIf` to conditionally display menu items based on the `userRole` retrieved from the authentication service.

### Q3: What does `ngOnInit()` do?

**A:** It's a lifecycle hook used to run initialization logic like checking auth token and subscribing to observables.

### Q4: Why use `AuthService` here?

**A:** It handles login state, token management, and user role fetching, keeping authentication logic centralized.

### Q5: What does `routerLinkActive="active"` do?

**A:** It adds the `active` class to the link when the route is active, useful for styling the current page in the sidebar.

### Q6: How does Angular handle real-time updates for login status?

**A:** Using `BehaviorSubject` in `AuthService` and subscribing to `isLoggedIn$` observable in the component.

### Q7: What would happen if the observable is not unsubscribed?

**A:** It may lead to **memory leaks**. Use `takeUntil` or `ngOnDestroy` to handle unsubscription in larger apps.

### Q8: What is the use of `[class.collapsed]="collapsed"`?

**A:** It dynamically adds the `collapsed` class to apply styles when the sidebar is in collapsed mode.

---