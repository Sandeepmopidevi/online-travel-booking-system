export interface SupportTicket {
    ticketID: number;
    status: string;
    issue: string;
    assignedAgent?: string;
    userID: number;
  }
  
  export interface SupportTicketDTO {
    status: string;
    issue: string;
    assignedAgent?: string;
    userId: number;
  }