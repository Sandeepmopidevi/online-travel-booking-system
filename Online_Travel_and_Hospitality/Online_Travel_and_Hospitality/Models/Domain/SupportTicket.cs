using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Online_Travel_and_Hospitality.Models.Domain
{
    public class SupportTicket
    {
        [Key]
        public int TicketID { get; set; }
        public int UserID { get; set; }
        public string Issue { get; set; }
        public string Status { get; set; }
        public string AssignedAgent { get; set; }
        [JsonIgnore]
        public User User { get; set; } = null;
    }
}
