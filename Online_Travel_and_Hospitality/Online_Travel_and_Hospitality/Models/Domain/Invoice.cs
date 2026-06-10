using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Online_Travel_and_Hospitality.Models.Domain
{
    public class Invoice
    {
        [Key]
        public int InvoiceID { get; set; }
        public int TotalAmount { get; set; }
        public DateTimeOffset Timestamp { get; set; }
        

        public int UserID { get; set; }
        public int BookingId { get; set; }
        [JsonIgnore]
        public Booking Booking { get; set; } = null!;
        [JsonIgnore]
        public User User { get; set; } = null!;
    }
}
