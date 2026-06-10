using Online_Travel_and_Hospitality.Models.Domain;
using Online_Travel_and_Hospitality.Models.DTO;

namespace Online_Travel_and_Hospitality.Interfaces
{
    public interface IItineraryService
    {
        Task<Itinerary> CreateItineraryAsync(ItineraryDTO itineraryDTO);
        Task<IEnumerable<Itinerary>> GetAllItinerariesAsync();
        Task<Itinerary?> GetItineraryByIdAsync(int id);
        Task<Itinerary?> UpdateItineraryAsync(int id, ItineraryDTO itineraryDTO);
        Task<bool> DeleteItineraryAsync(int id);
        Task<IEnumerable<Itinerary>> SearchItinerariesByUserAsync(int userId);
    }
}