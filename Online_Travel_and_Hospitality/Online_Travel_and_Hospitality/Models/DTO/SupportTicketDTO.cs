namespace Online_Travel_and_Hospitality.Models.DTO
{
    public class SupportTicketDTO
    {
        public string Issue { get; set; }
        public string Status { get; set; } // Status of the ticket (e.g., Open, Closed)

        public string AssignedAgent { get; set; } // List of agents assigned to the ticket

        public int UserId { get; set; }
    }
}
