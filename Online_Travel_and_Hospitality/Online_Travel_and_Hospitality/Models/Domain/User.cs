using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Online_Travel_and_Hospitality.Models.Domain
{
    public class User
    {
        [Key]
        public int UserId { get; set; }
        public string Name { get; set; } // Name of the user
        public string Email { get; set; } // Email of the user
        [JsonIgnore]
        public string Password { get; set; } // Password of the user    
        public string Role { get; set; } // Role of the user 
        public string ContactNumber { get; set; } // Contact number of the user
        public ICollection<SupportTicket> SupportTickets { get; set; } = new List<SupportTicket>();

        public ICollection<Review> Reviews { get; set; } = new List<Review>();
        public ICollection<Invoice> Invoices { get; set; } = new List<Invoice>();

        public ICollection<Booking> Bookings { get; set; } = new List<Booking>();

        public ICollection<Payment> Payments { get; set; } = new List<Payment>();


        public ICollection<Itinerary> Itineraries { get; set;} = new List<Itinerary>();



    }
}
