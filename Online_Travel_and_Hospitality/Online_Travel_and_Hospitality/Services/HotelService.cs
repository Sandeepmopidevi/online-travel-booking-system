using Microsoft.EntityFrameworkCore;
using Online_Travel_and_Hospitality.Data;
using Online_Travel_and_Hospitality.Interfaces;
using Online_Travel_and_Hospitality.Models.Domain;
using Online_Travel_and_Hospitality.Models.DTO;

namespace Online_Travel_and_Hospitality.Services
{
    public class HotelService : IHotelService
    {
        private readonly ApplicationDbContext _context;

        public HotelService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Hotel> CreateHotelAsync(HotelDTO hotelDTO)
        {
            var hotel = new Hotel
            {
                Name = hotelDTO.Name,
                Location = hotelDTO.Location,
                RoomsAvailable = hotelDTO.RoomsAvailable,
                Rating = hotelDTO.Rating,
                PricePerNight = hotelDTO.PricePerNight
            };
            _context.Hotels.Add(hotel);
            await _context.SaveChangesAsync();
            return hotel;
        }

        public async Task<IEnumerable<object>> GetAllHotelsAsync()
        {
            var hotels = await _context.Hotels.Include(h => h.Reviews).ToListAsync();
            return hotels.Select(hotel => new
            {
                hotel.HotelID,
                hotel.Name,
                hotel.Location,
                hotel.RoomsAvailable,
                hotel.Rating,
                hotel.PricePerNight,
                Reviews = hotel.Reviews.Select(review => new HotelReviewDTO
                {
                    UserID = review.UserID,
                    HotelId = review.HotelId.Value,
                    ReviewId = review.ReviewId,
                    Rating = review.Rating,
                    Comment = review.Comment,
                    Timestamp = new DateTimeOffset(review.Timestamp)
                }).ToList()
            }).ToList();
        }

        public async Task<object?> GetHotelByIdAsync(int id)
        {
            var hotel = await _context.Hotels.Include(h => h.Reviews).FirstOrDefaultAsync(h => h.HotelID == id);
            if (hotel == null) return null;
            return new
            {
                hotel.HotelID,
                hotel.Name,
                hotel.Location,
                hotel.RoomsAvailable,
                hotel.Rating,
                hotel.PricePerNight,
                Reviews = hotel.Reviews.Select(review => new HotelReviewDTO
                {
                    UserID = review.UserID,
                    HotelId = review.HotelId.Value,
                    ReviewId = review.ReviewId,
                    Rating = review.Rating,
                    Comment = review.Comment,
                    Timestamp = new DateTimeOffset(review.Timestamp)
                }).ToList()
            };
        }

        public async Task<Hotel?> UpdateHotelAsync(int id, HotelDTO hotelDTO)
        {
            var hotel = await _context.Hotels.FindAsync(id);
            if (hotel == null) return null;

            hotel.Name = hotelDTO.Name;
            hotel.Location = hotelDTO.Location;
            hotel.RoomsAvailable = hotelDTO.RoomsAvailable;
            hotel.Rating = hotelDTO.Rating;
            hotel.PricePerNight = hotelDTO.PricePerNight;

            _context.Entry(hotel).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return hotel;
        }

        public async Task<bool> DeleteHotelAsync(int id)
        {
            var hotel = await _context.Hotels.FindAsync(id);
            if (hotel == null) return false;

            _context.Hotels.Remove(hotel);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<Hotel>> SearchHotelsAsync(string name, string location)
        {
            IQueryable<Hotel> query = _context.Hotels.Where(h => h.RoomsAvailable > 0);
            if (!string.IsNullOrEmpty(name))
                query = query.Where(h => h.Name.Contains(name));
            if (!string.IsNullOrEmpty(location))
                query = query.Where(h => h.Location.Contains(location));
            return await query.ToListAsync();
        }
    }
}