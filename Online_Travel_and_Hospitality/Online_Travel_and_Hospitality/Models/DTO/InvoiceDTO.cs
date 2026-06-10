namespace Online_Travel_and_Hospitality.Models.DTO
{
    public class InvoiceDTO
    {
        public int TotalAmount { get; set; }
        public DateTimeOffset Timestamp { get; set; }

        public int UserID { get; set; }
        public int BookingId { get; set; }
    }
}
