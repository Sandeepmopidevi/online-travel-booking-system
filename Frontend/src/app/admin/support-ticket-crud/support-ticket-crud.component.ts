import { Component, OnInit } from '@angular/core';
import { SupportTicketService } from '../../services/support-ticket.service';
import { SupportTicket, SupportTicketDTO } from '../../models/support-ticket.model';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2'; // <-- Import SweetAlert2

@Component({
  standalone: false,
  selector: 'app-support-ticket-crud',
  templateUrl: './support-ticket-crud.component.html',
  styleUrls: ['./support-ticket-crud.component.css']
})
export class SupportTicketCrudComponent implements OnInit {
  tickets: SupportTicket[] = [];
  selectedTicket?: SupportTicket;
  isLoading = false;
  isEditing = false;
  isCreating = false;
  // For creating or editing
  ticketForm: SupportTicketDTO = {
    status: 'Open',
    issue: '',
    assignedAgent: '',
    userId: 0
  };

  constructor(
    private supportTicketService: SupportTicketService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadTickets();
  }

  loadTickets(): void {
    this.isLoading = true;
    this.supportTicketService.getSupportTickets().subscribe({
      next: (tickets) => {
        this.tickets = tickets;
        this.isLoading = false;
      },
      error: (err) => {
        this.toastr.error('Failed to load support tickets.', 'Error');
        this.isLoading = false;
      }
    });
  }

  startCreate(): void {
    this.isCreating = true;
    this.isEditing = false;
    this.selectedTicket = undefined;
    this.ticketForm = {
      status: 'Open',
      issue: '',
      assignedAgent: '',
      userId: 0
    };
  }

  startEdit(ticket: SupportTicket): void {
    this.isEditing = true;
    this.isCreating = false;
    this.selectedTicket = ticket;
    this.ticketForm = {
      status: ticket.status,
      issue: ticket.issue,
      assignedAgent: ticket.assignedAgent || '',
      userId: ticket.userID
    };
  }

  cancel(): void {
    this.isCreating = false;
    this.isEditing = false;
    this.selectedTicket = undefined;
    this.ticketForm = {
      status: 'Open',
      issue: '',
      assignedAgent: '',
      userId: 0
    };
  }

  submitForm(): void {
    if (this.isCreating) {
      // Create new ticket
      this.supportTicketService.createSupportTicket(this.ticketForm).subscribe({
        next: () => {
          this.toastr.success('Support ticket created.', 'Success');
          this.loadTickets();
          this.cancel();
        },
        error: () => {
          this.toastr.error('Failed to create support ticket.', 'Error');
        }
      });
    } else if (this.isEditing && this.selectedTicket) {
      // Update existing ticket
      this.supportTicketService.updateSupportTicket(this.selectedTicket.ticketID, this.ticketForm).subscribe({
        next: () => {
          this.toastr.success('Support ticket updated.', 'Success');
          this.loadTickets();
          this.cancel();
        },
        error: () => {
          this.toastr.error('Failed to update support ticket.', 'Error');
        }
      });
    }
  }

  confirmDelete(ticket: SupportTicket): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This support ticket will be deleted permanently!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.supportTicketService.deleteSupportTicket(ticket.ticketID).subscribe({
          next: () => {
            this.toastr.success('Support ticket deleted.', 'Deleted');
            this.loadTickets();
          },
          error: () => {
            this.toastr.error('Failed to delete support ticket.', 'Error');
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.toastr.info('Deletion cancelled.', 'Info');
      }
    });
  }
}