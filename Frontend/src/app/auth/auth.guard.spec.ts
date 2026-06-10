import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { ActivatedRouteSnapshot } from '@angular/router';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let routerSpy: jasmine.SpyObj<Router>;
  let mockRoute: ActivatedRouteSnapshot;

  beforeEach(() => {
    // Create a spy object for the Router
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: Router, useValue: routerSpy }
      ]
    });

    // Inject the AuthGuard
    authGuard = TestBed.inject(AuthGuard);

    // Create a mock ActivatedRouteSnapshot
    mockRoute = {} as ActivatedRouteSnapshot;
  });

  it('should be created', () => {
    expect(authGuard).toBeTruthy();
  });

  it('should allow activation if token exists', () => {
    // Mock the sessionStorage to simulate a logged-in user
    spyOn(sessionStorage, 'getItem').and.returnValue('mockToken');

    const canActivate = authGuard.canActivate(mockRoute);

    expect(canActivate).toBeTrue();
  });

  it('should redirect to login if token does not exist', () => {
    // Mock the sessionStorage to simulate a logged-out user
    spyOn(sessionStorage, 'getItem').and.returnValue(null);

    const canActivate = authGuard.canActivate(mockRoute);

    expect(canActivate).toBeFalse();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });
});