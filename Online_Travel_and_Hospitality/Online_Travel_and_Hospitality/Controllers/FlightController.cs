using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Online_Travel_and_Hospitality.Interfaces;
using Online_Travel_and_Hospitality.Models.DTO;

namespace Online_Travel_and_Hospitality.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FlightController : ControllerBase
    {
        private readonly IFlightService _flightService;

        public FlightController(IFlightService flightService)
        {
            _flightService = flightService;
        }

        [HttpPost]
        [Route("CreateFlights")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateFlights(FlightDTO flightDTO)
        {
            var flight = await _flightService.CreateFlightAsync(flightDTO);
            return Ok(flight);
        }

        [HttpGet]
        [Route("GetFlights")]
        [Authorize(Roles = "Admin,Traveller")]
        public async Task<IActionResult> GetFlights()
        {
            var flights = await _flightService.GetFlightsAsync();
            return Ok(flights);
        }

        [HttpGet]
        [Route("GetFlight/{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetFlight(int id)
        {
            var flight = await _flightService.GetFlightByIdAsync(id);
            if (flight == null)
                return NotFound();
            return Ok(flight);
        }

        [HttpPut]
        [Route("UpdateFlight/{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateFlight(int id, FlightDTO flightDTO)
        {
            var updatedFlight = await _flightService.UpdateFlightAsync(id, flightDTO);
            if (updatedFlight == null)
                return NotFound();
            return Ok(updatedFlight);
        }

        [HttpDelete]
        [Route("DeleteFlight/{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteFlight(int id)
        {
            var result = await _flightService.DeleteFlightAsync(id);
            if (!result)
                return NotFound(new { message = "Flight not found" });
            return Ok(new { message = "Flight deleted successfully" });
        }

        [HttpGet]
        [Route("SearchFlights")]
        [Authorize(Roles = "Admin,Traveller,Travel Agent")]
        public async Task<IActionResult> SearchFlights([FromQuery] string boardingCity, [FromQuery] string destinationCity, [FromQuery] DateTime? date)
        {
            try
            {
                var flights = await _flightService.SearchFlightsAsync(boardingCity, destinationCity, date);
                return Ok(flights);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}