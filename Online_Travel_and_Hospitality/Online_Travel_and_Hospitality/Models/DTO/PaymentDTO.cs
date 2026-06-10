namespace Online_Travel_and_Hospitality.Models.DTO
{
    public class PaymentDTO
    {
        public int BookingId { get; set; }
        public int UserId { get; set; }
        public int Amount { get; set; }
        public string Status { get; set; }
        public string PaymentMethod { get; set; }
    }
}
