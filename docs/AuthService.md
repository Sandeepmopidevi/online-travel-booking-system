# Angular AuthService with Full Explanation

This document explains the purpose and functionality of each part of the Angular `AuthService`. This service handles user authentication, session management, and role-based access control.

---

## Imports

```ts
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
````

* `HttpClient`: Used to send HTTP requests to backend API.
* `HttpHeaders`: Allows setting custom headers (e.g., Authorization token).
* `Injectable`: Decorator to define a class as a service that can be injected.
* `BehaviorSubject`: Emits the latest value and all subsequent values to subscribers.
* `Observable`: Represents data that can be observed over time (like promises but more powerful).
* `throwError`: Emits an error observable.
* `catchError`: Handles errors in HTTP operations.
* `map`: Transforms observable results (e.g., extract data from response).

---

## @Injectable Service Declaration

```ts
@Injectable({
  providedIn: 'root',
})
```

Marks this service as available application-wide (singleton), so it can be injected wherever needed.

---

## Class Variables

```ts
private baseUrl = 'https://localhost:7193/api';
private authUrl = `${this.baseUrl}/Auth`;
```

* `baseUrl`: Base URL for all API requests.
* `authUrl`: Endpoint for authentication-specific requests.

```ts
private isLoggedInSubject = new BehaviorSubject<boolean>(false);
private userRoleSubject = new BehaviorSubject<string | null>(this.getUserRoleFromStorage());
```

* `isLoggedInSubject`: Tracks if a user is currently logged in.
* `userRoleSubject`: Tracks the current user's role, initialized from sessionStorage.

```ts
isLoggedIn$ = this.isLoggedInSubject.asObservable();
userRole$ = this.userRoleSubject.asObservable();
```

* Exposes the login status and role as Observables for components to subscribe to.

---

## Constructor

```ts
constructor(private http: HttpClient) {
  this.checkLoginState();
}
```

* Injects `HttpClient` for API calls.
* Calls `checkLoginState()` to initialize the login status from existing session token.

---

## Login Method

```ts
login(data: LoginRequest): Observable<LoginResponse>
```

* Takes email/password and sends a POST request.
* If successful, stores token, email, and role in `sessionStorage`.
* Updates login and role states via `BehaviorSubjects`.

```ts
map((response) => { ... })
```

* Parses login response and saves data in session storage.

```ts
catchError((error) => { ... })
```

* Catches and formats login errors.

---

## Register Method

```ts
register(data: RegisterRequest): Observable<RegisterResponse>
```

* Sends user registration data to the backend.
* Returns success/failure as an observable.

---

## Role Accessor

```ts
getUserRole(): string | null
```

* Returns the current user role from the `BehaviorSubject`.

---

## Role From Storage

```ts
private getUserRoleFromStorage(): string | null
```

* Reads roles from `sessionStorage` and parses them.
* Used to initialize `userRoleSubject`.

---

## Get Current User

```ts
getCurrentUser(): { email: string; roles: string[] } | null
```

* Returns an object containing current user's email and roles from session storage.

---

## Get UserId By Email

```ts
getUserIdByEmail(): Observable<number>
```

* Retrieves current user's email from session.
* Validates email format.
* Makes HTTP GET request to fetch user ID from backend using email.
* Returns user ID as an observable or throws meaningful error.

---

## Check Login State

```ts
checkLoginState(): void
```

* Checks if token exists and is not expired.
* Updates login and role states accordingly.

---

## Get Token

```ts
getToken(): string | null
```

* Retrieves the JWT token from sessionStorage.

---

## Is Logged In

```ts
isLoggedIn(): boolean
```

* Returns true if a valid token exists.

---

## Logout

```ts
logout(): void
```

* Clears token, email, and roles from sessionStorage.
* Updates `isLoggedInSubject` and `userRoleSubject`.

---

## Validate Email

```ts
private validateEmail(email: string): boolean
```

* Validates email format using regex.

---

## Check Token Expiry

```ts
isTokenExpired(token: string): boolean
```

* Decodes JWT token and checks if it is expired.

---

## Get Auth Headers

```ts
public getAuthHeaders(): HttpHeaders
```

* Adds Authorization header using token for protected routes.

---

## Interfaces

### LoginRequest

```ts
export interface LoginRequest {
  email: string;
  password: string;
}
```

* Payload sent during login.

### LoginResponse

```ts
export interface LoginResponse {
  email: string;
  roles: string[];
  token: string;
}
```

* Response received after login.

### RegisterRequest

```ts
export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role: string;
  contactNumber: string;
}
```

* Payload sent during registration.

### RegisterResponse

```ts
export interface RegisterResponse {
  message: string;
}
```

* Response after registration.

---

## Summary

The `AuthService`:

* Handles login/logout.
* Manages session state (token, email, roles).
* Provides methods to check login status and get user role/id.
* Communicates with the backend API via `HttpClient`.
* Uses `BehaviorSubject` for reactive programming and state sharing across components.

This service is essential for implementing secure and role-based authentication in Angular apps.