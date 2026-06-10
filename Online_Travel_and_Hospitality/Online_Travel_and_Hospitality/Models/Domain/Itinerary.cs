using System.Text.Json.Serialization;

namespace Online_Travel_and_Hospitality.Models.Domain
{
    public class Itinerary
    {
        public int ItineraryID { get; set; }
        public string CustomizationDetails {  get; set; }
        public int UserID { get; set; }
        public int PackageID { get; set; }
        [JsonIgnore]
        public User User { get; set; } = null!;
        public Package Package { get; set; } = null!;

    }
}
