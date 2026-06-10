namespace Online_Travel_and_Hospitality.Models.DTO
{
    public class BookingDTO
    {
        public string Type { get; set; } // "Hotel" or "Flight"
        public string Status { get; set; }
        public int PaymentId { get; set; }

        public int UserId { get; set; }
    }
}
