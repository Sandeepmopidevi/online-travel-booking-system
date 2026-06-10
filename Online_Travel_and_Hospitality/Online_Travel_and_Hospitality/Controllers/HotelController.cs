using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Online_Travel_and_Hospitality.Interfaces;
using Online_Travel_and_Hospitality.Models.DTO;

namespace Online_Travel_and_Hospitality.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HotelController : ControllerBase
    {
        private readonly IHotelService _hotelService;

        public HotelController(IHotelService hotelService)
        {
            _hotelService = hotelService;
        }

        [HttpPost]
        [Route("CreateHotels")]
        [Authorize(Roles = "Admin, Hotel Manager")]
        public async Task<IActionResult> CreateHotels(HotelDTO hotelDTO)
        {
            var hotel = await _hotelService.CreateHotelAsync(hotelDTO);
            return Ok(hotel);
        }

        [HttpGet]
        [Route("GetHotels")]
        [Authorize(Roles = "Admin, Traveller, Hotel Manager")]
        public async Task<IActionResult> GetHotels()
        {
            var hotels = await _hotelService.GetAllHotelsAsync();
            return Ok(hotels);
        }

        [HttpGet]
        [Route("GetHotel/{id}")]
        [Authorize(Roles = "Admin, Hotel Manager")]
        public async Task<IActionResult> GetHotel(int id)
        {
            var hotel = await _hotelService.GetHotelByIdAsync(id);
            if (hotel == null)
                return NotFound(new { message = "Hotel not found" });
            return Ok(hotel);
        }

        [HttpPut]
        [Route("UpdateHotel/{id}")]
        [Authorize(Roles = "Admin, Hotel Manager")]
        public async Task<IActionResult> UpdateHotel(int id, HotelDTO hotelDTO)
        {
            var updatedHotel = await _hotelService.UpdateHotelAsync(id, hotelDTO);
            if (updatedHotel == null)
                return NotFound();
            return Ok(updatedHotel);
        }

        [HttpDelete]
        [Route("DeleteHotel/{id}")]
        [Authorize(Roles = "Admin, Hotel Manager")]
        public async Task<IActionResult> DeleteHotel(int id)
        {
            var result = await _hotelService.DeleteHotelAsync(id);
            if (!result)
                return NotFound(new { message = "Hotel not found" });
            return Ok(new { message = "Hotel deleted successfully" });
        }

        [HttpGet]
        [Route("SearchHotels")]
        [Authorize(Roles = "Admin, Traveller, Hotel Manager, Travel Agent")]
        public async Task<IActionResult> SearchHotels([FromQuery] string name, [FromQuery] string location)
        {
            try
            {
                var hotels = await _hotelService.SearchHotelsAsync(name, location);
                return Ok(hotels);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}