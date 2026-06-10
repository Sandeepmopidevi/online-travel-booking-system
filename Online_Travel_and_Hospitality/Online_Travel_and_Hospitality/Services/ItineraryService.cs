using Microsoft.EntityFrameworkCore;
using Online_Travel_and_Hospitality.Data;
using Online_Travel_and_Hospitality.Interfaces;
using Online_Travel_and_Hospitality.Models.Domain;
using Online_Travel_and_Hospitality.Models.DTO;

namespace Online_Travel_and_Hospitality.Services
{
    public class ItineraryService : IItineraryService
    {
        private readonly ApplicationDbContext _context;

        public ItineraryService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Itinerary> CreateItineraryAsync(ItineraryDTO itineraryDTO)
        {
            var tempUser = await _context.Users.FirstOrDefaultAsync(h => h.UserId == itineraryDTO.UserID);
            if (tempUser == null)
                throw new ArgumentException($"User with ID {itineraryDTO.UserID} does not exist.");

            var itinerary = new Itinerary
            {
                CustomizationDetails = itineraryDTO.CustomizationDetails,
                UserID = itineraryDTO.UserID,
                PackageID = itineraryDTO.PackageID
            };
            _context.Itineraries.Add(itinerary);
            await _context.SaveChangesAsync();
            return itinerary;
        }

        public async Task<IEnumerable<Itinerary>> GetAllItinerariesAsync()
        {
            return await _context.Itineraries.ToListAsync();
        }

        public async Task<Itinerary?> GetItineraryByIdAsync(int id)
        {
            return await _context.Itineraries
                .Include(i => i.Package)
                .FirstOrDefaultAsync(i => i.ItineraryID == id);
        }

        public async Task<Itinerary?> UpdateItineraryAsync(int id, ItineraryDTO itineraryDTO)
        {
            var itinerary = await _context.Itineraries.FindAsync(id);
            if (itinerary == null)
                return null;

            itinerary.CustomizationDetails = itineraryDTO.CustomizationDetails;
            itinerary.UserID = itineraryDTO.UserID;
            itinerary.PackageID = itineraryDTO.PackageID;

            _context.Entry(itinerary).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return itinerary;
        }

        public async Task<bool> DeleteItineraryAsync(int id)
        {
            var itinerary = await _context.Itineraries.FindAsync(id);
            if (itinerary == null)
                return false;

            _context.Itineraries.Remove(itinerary);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<Itinerary>> SearchItinerariesByUserAsync(int userId)
        {
            if (userId <= 0)
                return new List<Itinerary>();

            return await _context.Itineraries
                .Where(i => i.UserID == userId)
                .ToListAsync();
        }
    }
}