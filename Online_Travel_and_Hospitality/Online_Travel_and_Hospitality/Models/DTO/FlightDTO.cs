namespace Online_Travel_and_Hospitality.Models.DTO
{
    public class FlightDTO
    {
        public string Airline { get; set; }
        public string FlightNumber { get; set; }
        public string BoardingCity { get; set; }
        public string DestinationCity { get; set; }
        public DateTime Departure { get; set; }
        public DateTime Arrival { get; set; }
        public decimal Price { get; set; }
        public bool Availability { get; set; }
    }
}
