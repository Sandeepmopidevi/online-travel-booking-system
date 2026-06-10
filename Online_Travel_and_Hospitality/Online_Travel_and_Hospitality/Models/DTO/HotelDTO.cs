namespace Online_Travel_and_Hospitality.Models.DTO
{
    public class HotelDTO
    {
        public string Name { get; set; }
        public string Location { get; set; }
        public int RoomsAvailable { get; set; }
        public double Rating { get; set; }
        public decimal PricePerNight { get; set; }
    }
}
