using System.ComponentModel.DataAnnotations;

namespace Online_Travel_and_Hospitality.Models.Domain
{
    public class Hotel
    {

        [Key]
        public int HotelID { get; set; }
        public string Name { get; set; }
        public string Location { get; set; }
        public int RoomsAvailable { get; set; }
        public double Rating { get; set; }
        public decimal PricePerNight { get; set; }

        public ICollection<Review> Reviews { get; set; } = new List<Review>();

    }
}
