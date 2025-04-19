import { Component } from '@angular/core';

@Component({
  selector: 'app-unauthorized',
  template: `
    <div class="unauthorized">
      <h1>Unauthorized</h1>
      <p>You do not have permission to access this page.</p>
      <a routerLink="/login">Go Back to Login</a>
    </div>
  `,
  styles: [
    `
      .unauthorized {
        text-align: center;
        margin-top: 50px;
      }
      .unauthorized a {
        color: #007bff;
        text-decoration: none;
      }
      .unauthorized a:hover {
        text-decoration: underline;
      }
    `,
  ],
})
export class UnauthorizedComponent {}