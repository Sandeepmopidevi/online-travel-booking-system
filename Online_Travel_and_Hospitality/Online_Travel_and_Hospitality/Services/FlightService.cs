using Microsoft.EntityFrameworkCore;
using Online_Travel_and_Hospitality.Data;
using Online_Travel_and_Hospitality.Models.Domain;
using Online_Travel_and_Hospitality.Models.DTO;
using Online_Travel_and_Hospitality.Interfaces;

namespace Online_Travel_and_Hospitality.Services
{
    public class FlightService : IFlightService
    {
        private readonly ApplicationDbContext _context;

        public FlightService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Flight> CreateFlightAsync(FlightDTO flightDTO)
        {
            var flight = new Flight
            {
                Airline = flightDTO.Airline,
                FlightNumber = flightDTO.FlightNumber,
                BoardingCity = flightDTO.BoardingCity,
                DestinationCity = flightDTO.DestinationCity,
                Departure = flightDTO.Departure,
                Arrival = flightDTO.Arrival,
                Price = flightDTO.Price,
                Availability = flightDTO.Availability
            };

            _context.Flights.Add(flight);
            await _context.SaveChangesAsync();
            return flight;
        }

        public async Task<IEnumerable<Flight>> GetFlightsAsync()
        {
            return await _context.Flights.ToListAsync();
        }

        public async Task<Flight?> GetFlightByIdAsync(int id)
        {
            return await _context.Flights.FindAsync(id);
        }

        public async Task<Flight?> UpdateFlightAsync(int id, FlightDTO flightDTO)
        {
            var flight = await _context.Flights.FindAsync(id);
            if (flight == null)
                return null;

            flight.Airline = flightDTO.Airline;
            flight.FlightNumber = flightDTO.FlightNumber;
            flight.BoardingCity = flightDTO.BoardingCity;
            flight.DestinationCity = flightDTO.DestinationCity;
            flight.Departure = flightDTO.Departure;
            flight.Arrival = flightDTO.Arrival;
            flight.Price = flightDTO.Price;
            flight.Availability = flightDTO.Availability;

            _context.Entry(flight).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return flight;
        }

        public async Task<bool> DeleteFlightAsync(int id)
        {
            var flight = await _context.Flights.FindAsync(id);
            if (flight == null)
                return false;

            _context.Flights.Remove(flight);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<Flight>> SearchFlightsAsync(string boardingCity, string destinationCity, DateTime? date)
        {
            if (string.IsNullOrWhiteSpace(boardingCity) && string.IsNullOrWhiteSpace(destinationCity))
            {
                throw new ArgumentException("At least one search parameter must be provided.");
            }

            var query = _context.Flights.AsQueryable();

            if (!string.IsNullOrWhiteSpace(boardingCity))
            {
                query = query.Where(f => f.BoardingCity.ToLower().Contains(boardingCity.ToLower()));
            }
            if (!string.IsNullOrWhiteSpace(destinationCity))
            {
                query = query.Where(f => f.DestinationCity.ToLower().Contains(destinationCity.ToLower()));
            }
            if (date.HasValue)
            {
                query = query.Where(f => f.Departure.Date == date.Value.Date);
            }

            return await query.ToListAsync();
        }
    }
}