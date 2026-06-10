using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Online_Travel_and_Hospitality.Models.Domain
{
    public class Booking
    {
        [Key]
        public int BookingID { get; set; }
        public int UserID { get; set; }

       
        public string Type { get; set; } 
        public string Status { get; set; }
        public int PaymentID { get; set; }

        [JsonIgnore]
        public User User { get; set; } = null!;

        public ICollection<Invoice> Invoices { get; set; } = new List<Invoice>();
        
    }
}
