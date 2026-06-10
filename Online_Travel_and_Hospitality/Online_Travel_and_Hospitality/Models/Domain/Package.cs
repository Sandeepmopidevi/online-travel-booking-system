namespace Online_Travel_and_Hospitality.Models.Domain
{
    public class Package
    {
        public int PackageID {  get; set; }
        public string Name {  get; set; }
        public string IncludedHotels {  get; set; }
        public string IncludedFlights {  get; set; }
        public string Activities { get; set; }
        public int Price {  get; set; }
        public ICollection<Itinerary> Itineraries { get; set; } = new List<Itinerary>();
    }
}
