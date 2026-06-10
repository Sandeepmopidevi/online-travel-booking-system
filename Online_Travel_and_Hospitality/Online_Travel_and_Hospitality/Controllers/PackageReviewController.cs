using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Online_Travel_and_Hospitality.Interfaces;
using Online_Travel_and_Hospitality.Models.DTO;

namespace Online_Travel_and_Hospitality.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PackageReviewController : ControllerBase
    {
        private readonly IPackageReviewService _packageReviewService;

        public PackageReviewController(IPackageReviewService packageReviewService)
        {
            _packageReviewService = packageReviewService;
        }

        [HttpPost]
        [Route("CreateReviews")]
        [Authorize(Roles = "Admin,Traveller")]
        public async Task<IActionResult> CreateReviews(PackageReviewDTO reviewDTO)
        {
            try
            {
                var createdReview = await _packageReviewService.CreateReviewAsync(reviewDTO);
                return Ok(createdReview);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet]
        [Route("GetReviews")]
        [Authorize(Roles = "Admin, Traveller, Travel Agent")]
        public async Task<IActionResult> GetReviews()
        {
            var reviews = await _packageReviewService.GetAllReviewsAsync();
            return Ok(reviews);
        }

        [HttpGet]
        [Route("GetReviewByPackage/{id}")]
        [Authorize(Roles = "Admin, Traveller,Travel Agent ")]
        public async Task<IActionResult> GetReviewByPackage(int id)
        {
            var reviews = await _packageReviewService.GetReviewsByPackageAsync(id);
            if (!reviews.Any())
                return NotFound(new { message = "No reviews found for the given Package ID" });
            return Ok(reviews);
        }

        [HttpPut]
        [Route("UpdateReview/{id}")]
        [Authorize(Roles = "Admin,Traveller")]
        public async Task<IActionResult> UpdateReview(int id, PackageReviewDTO reviewDTO)
        {
            var updatedReview = await _packageReviewService.UpdateReviewAsync(id, reviewDTO);
            if (updatedReview == null)
                return NotFound(new { message = "Review not found" });
            return Ok(updatedReview);
        }

        [HttpDelete]
        [Route("DeleteReview/{id}")]
        [Authorize(Roles = "Admin,Traveller")]
        public async Task<IActionResult> DeleteReview(int id)
        {
            var result = await _packageReviewService.DeleteReviewAsync(id);
            if (!result)
                return NotFound(new { message = "Review not found" });
            return Ok(new { message = "Review deleted successfully" });
        }
    }
}