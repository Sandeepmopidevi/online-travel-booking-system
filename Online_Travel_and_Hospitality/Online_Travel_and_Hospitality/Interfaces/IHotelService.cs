using Online_Travel_and_Hospitality.Models.Domain;
using Online_Travel_and_Hospitality.Models.DTO;

namespace Online_Travel_and_Hospitality.Interfaces
{
    public interface IHotelService
    {
        Task<Hotel> CreateHotelAsync(HotelDTO hotelDTO);
        Task<IEnumerable<object>> GetAllHotelsAsync();
        Task<object?> GetHotelByIdAsync(int id);
        Task<Hotel?> UpdateHotelAsync(int id, HotelDTO hotelDTO);
        Task<bool> DeleteHotelAsync(int id);
        Task<IEnumerable<Hotel>> SearchHotelsAsync(string name, string location);
    }
}