using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Online_Travel_and_Hospitality.Interfaces;
using Online_Travel_and_Hospitality.Models.DTO;

namespace Online_Travel_and_Hospitality.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FlightReviewController : ControllerBase
    {
        private readonly IFlightReviewService _flightReviewService;

        public FlightReviewController(IFlightReviewService flightReviewService)
        {
            _flightReviewService = flightReviewService;
        }

        [HttpPost]
        [Route("CreateReviews")]
        [Authorize(Roles = "Admin,Traveller")]
        public async Task<IActionResult> CreateReviews(FlightReviewDTO reviewDTO)
        {
            try
            {
                var createdReview = await _flightReviewService.CreateReviewAsync(reviewDTO);
                return Ok(createdReview);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet]
        [Route("GetReviews")]
        [Authorize(Roles = "Admin,Traveller")]
        public async Task<IActionResult> GetReviews()
        {
            var reviews = await _flightReviewService.GetAllReviewsAsync();
            return Ok(reviews);
        }

        [HttpGet]
        [Route("GetReviewByFlight/{id}")]
        [Authorize(Roles = "Admin, Traveller")]
        public async Task<IActionResult> GetReviewByFlight(int id)
        {
            var reviews = await _flightReviewService.GetReviewsByFlightAsync(id);
            if (!reviews.Any())
                return NotFound(new { message = "No reviews found for the given Flight ID" });

            return Ok(reviews);
        }

        [HttpPut]
        [Route("UpdateReview/{id}")]
        [Authorize(Roles = "Admin, Traveller")]
        public async Task<IActionResult> UpdateReview(int id, FlightReviewDTO reviewDTO)
        {
            var updatedReview = await _flightReviewService.UpdateReviewAsync(id, reviewDTO);
            if (updatedReview == null)
                return NotFound(new { message = "Review not found" });

            return Ok(updatedReview);
        }

        [HttpDelete]
        [Route("DeleteReview/{id}")]
        [Authorize(Roles = "Admin,Traveller")]
        public async Task<IActionResult> DeleteReview(int id)
        {
            var result = await _flightReviewService.DeleteReviewAsync(id);
            if (!result)
                return NotFound(new { message = "Review not found" });

            return Ok(new { message = "Review deleted successfully" });
        }
    }
}