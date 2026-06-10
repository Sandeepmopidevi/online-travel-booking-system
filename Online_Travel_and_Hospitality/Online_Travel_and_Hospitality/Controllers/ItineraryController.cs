using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Online_Travel_and_Hospitality.Interfaces;
using Online_Travel_and_Hospitality.Models.DTO;

namespace Online_Travel_and_Hospitality.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItineraryController : ControllerBase
    {
        private readonly IItineraryService _itineraryService;

        public ItineraryController(IItineraryService itineraryService)
        {
            _itineraryService = itineraryService;
        }

        [HttpPost]
        [Route("CreateItinerary")]
        [Authorize(Roles = "Admin, Traveller, Travel Agent")]
        public async Task<IActionResult> CreateItinerary(ItineraryDTO itinerary)
        {
            try
            {
                var createdItinerary = await _itineraryService.CreateItineraryAsync(itinerary);
                return Ok(createdItinerary);
            }
            catch (ArgumentException e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet]
        [Route("GetItinerary")]
        [Authorize(Roles = "Admin, Travel Agent")]
        public async Task<IActionResult> GetItinerary()
        {
            var itineraries = await _itineraryService.GetAllItinerariesAsync();
            return Ok(itineraries);
        }

        [HttpGet]
        [Route("GetItinerary/{id}")]
        [Authorize(Roles = "Admin, Traveller, Travel Agent")]
        public async Task<IActionResult> GetItinerary(int id)
        {
            var itinerary = await _itineraryService.GetItineraryByIdAsync(id);
            if (itinerary == null)
                return NotFound(new { message = "Itinerary not found" });
            return Ok(itinerary);
        }

        [HttpPut]
        [Route("UpdateItinerary/{id}")]
        [Authorize(Roles = "Admin,Traveller, Travel Agent")]
        public async Task<IActionResult> UpdateItinerary(int id, ItineraryDTO itineraryDTO)
        {
            var updatedItinerary = await _itineraryService.UpdateItineraryAsync(id, itineraryDTO);
            if (updatedItinerary == null)
                return NotFound(new { message = "Itinerary not found" });
            return Ok(updatedItinerary);
        }

        [HttpDelete]
        [Route("DeleteItinerary/{id}")]
        [Authorize(Roles = "Admin, Traveller, Travel Agent")]
        public async Task<IActionResult> DeleteItinerary(int id)
        {
            var result = await _itineraryService.DeleteItineraryAsync(id);
            if (!result)
                return NotFound(new { message = "Itinerary not found" });
            return Ok(new { message = "Itinerary deleted successfully" });
        }

        [HttpGet]
        [Route("SearchItineraries")]
        [Authorize(Roles = "Admin, Traveller, Hotel Manager, Travel Agent")]
        public async Task<IActionResult> SearchItineraries([FromQuery] int UserID)
        {
            var itineraries = await _itineraryService.SearchItinerariesByUserAsync(UserID);
            return Ok(itineraries);
        }
    }
}