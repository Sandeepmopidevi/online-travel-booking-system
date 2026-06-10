using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Online_Travel_and_Hospitality.Interfaces;
using Online_Travel_and_Hospitality.Models.DTO;

namespace Online_Travel_and_Hospitality.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HotelReviewController : ControllerBase
    {
        private readonly IHotelReviewService _hotelReviewService;

        public HotelReviewController(IHotelReviewService hotelReviewService)
        {
            _hotelReviewService = hotelReviewService;
        }

        [HttpPost]
        [Route("CreateReviews")]
        [Authorize(Roles = "Admin, Traveller")]
        public async Task<ActionResult<HotelReviewDTO>> CreateReviews(HotelReviewDTO review)
        {
            try
            {
                var created = await _hotelReviewService.CreateReviewAsync(review);
                return Ok(created);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("GetReviews")]
        [Authorize(Roles = "Admin, Traveller, Hotel Manager")]
        public async Task<ActionResult<IEnumerable<HotelReviewDTO>>> GetReviews()
        {
            var hotelReviewDTOs = await _hotelReviewService.GetReviewsAsync();
            return Ok(hotelReviewDTOs);
        }

        [HttpGet]
        [Route("GetReview/{id}")]
        [Authorize(Roles = "Admin, Hotel Manager")]
        public async Task<ActionResult<HotelReviewDTO>> GetReview(int id)
        {
            var hotelReviewDTO = await _hotelReviewService.GetReviewByIdAsync(id);
            if (hotelReviewDTO == null)
            {
                return NotFound(new { message = "Review not found" });
            }
            return Ok(hotelReviewDTO);
        }

        [HttpPut]
        [Route("UpdateReview/{id}")]
        [Authorize(Roles = "Admin, Traveller")]
        public async Task<IActionResult> UpdateReview(int id, HotelReviewDTO reviewDTO)
        {
            var updatedReviewDTO = await _hotelReviewService.UpdateReviewAsync(id, reviewDTO);
            if (updatedReviewDTO == null)
            {
                return NotFound(new { message = "Review not found" });
            }
            return Ok(updatedReviewDTO);
        }

        [HttpDelete]
        [Route("DeleteReview/{id}")]
        [Authorize(Roles = "Admin, Traveller")]
        public async Task<IActionResult> DeleteReview(int id)
        {
            var deleted = await _hotelReviewService.DeleteReviewAsync(id);
            if (!deleted)
            {
                return NotFound(new { message = "Review not found" });
            }
            return Ok(new { message = "Review deleted successfully" });
        }
    }
}