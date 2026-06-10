import { Component } from '@angular/core';
import { SupportTicketService } from '../../services/support-ticket.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: false,
  selector: 'app-support-ticket',
  templateUrl: './support-ticket.component.html',
  styleUrls: ['./support-ticket.component.css']
})
export class SupportTicketComponent {
  issue: string = '';
  isLoading = false;
  userId: number | null = null;

  constructor(
    private supportTicketService: SupportTicketService,
    private toastr: ToastrService,
    private authService: AuthService
  ) {
    // Fetch the logged-in user's userId on component init
    this.authService.getUserIdByEmail().subscribe({
      next: (id) => {
        this.userId = id;
      },
      error: () => {
        this.toastr.error('Failed to get user ID. Please log in again.', 'Error');
      }
    });
  }

  submitTicket() {
    if (!this.issue.trim()) {
      this.toastr.warning('Please enter an issue description.', 'Validation');
      return;
    }

    if (!this.userId) {
      this.toastr.error('Unable to determine user. Please log in again.', 'Error');
      return;
    }

    this.isLoading = true;
    const ticket = {
      userId: this.userId,
      issue: this.issue,
      assignedAgent: '',
      status: ''
    };

    this.supportTicketService.createSupportTicket(ticket).subscribe({
      next: () => {
        this.toastr.success('Your support issue has been submitted.', 'Submitted');
        this.issue = '';
        this.isLoading = false;
      },
      error: () => {
        this.toastr.error('Failed to submit issue. Please try again.', 'Error');
        this.isLoading = false;
      }
    });
  }
}