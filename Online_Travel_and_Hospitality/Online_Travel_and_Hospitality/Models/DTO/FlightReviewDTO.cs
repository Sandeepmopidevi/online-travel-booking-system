namespace Online_Travel_and_Hospitality.Models.DTO
{
    public class FlightReviewDTO
    {
        public int UserID { get; set; }
        public int FlightId { get; set; }
        public int ReviewId { get; set; }
        public int Rating { get; set; }
        public string Comment { get; set; }
        public DateTime Timestamp { get; set; }
    }
}