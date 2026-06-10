using Online_Travel_and_Hospitality.Models.Domain;
using Online_Travel_and_Hospitality.Models.DTO;

namespace Online_Travel_and_Hospitality.Interfaces
{
    public interface IFlightService
    {
        Task<Flight> CreateFlightAsync(FlightDTO flightDTO);
        Task<IEnumerable<Flight>> GetFlightsAsync();
        Task<Flight?> GetFlightByIdAsync(int id);
        Task<Flight?> UpdateFlightAsync(int id, FlightDTO flightDTO);
        Task<bool> DeleteFlightAsync(int id);
        Task<IEnumerable<Flight>> SearchFlightsAsync(string boardingCity, string destinationCity, DateTime? date);
    }
}