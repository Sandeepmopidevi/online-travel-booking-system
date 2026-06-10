using System.Text.Json.Serialization;
using Online_Travel_and_Hospitality.Models.Domain;

public class Review
{
    public int ReviewId { get; set; } // Primary Key
    public int UserID { get; set; }
    public int? FlightID { get; set; } // Nullable to allow reviews for flights
    public int? HotelId { get; set; }  // Nullable to allow reviews for hotels
    public int? PackageId { get; set; } // Nullable to allow reviews for packages
    public int Rating { get; set; }
    public string Comment { get; set; }
    public DateTime Timestamp { get; set; }

    // Navigation properties
    public Flight Flight { get; set; }
    public Hotel Hotel { get; set; }
    public Package Package { get; set; } // Navigation property for Package
    [JsonIgnore]
    public User User { get; set; }
}