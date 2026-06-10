namespace Online_Travel_and_Hospitality.Models.DTO
{
    public class HotelReviewDTO
    {
        public int ReviewId { get; set; }
        public int Rating { get; set; }
        public string Comment { get; set; }
        public DateTimeOffset Timestamp { get; set; }

        public int HotelId { get; set; }
        public int UserID { get; set; }
    }
}
