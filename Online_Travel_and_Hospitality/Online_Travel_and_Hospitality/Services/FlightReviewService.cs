using Microsoft.EntityFrameworkCore;
using Online_Travel_and_Hospitality.Data;
using Online_Travel_and_Hospitality.Interfaces;
using Online_Travel_and_Hospitality.Models.DTO;
using Online_Travel_and_Hospitality.Models.Domain;

namespace Online_Travel_and_Hospitality.Services
{
    public class FlightReviewService : IFlightReviewService
    {
        private readonly ApplicationDbContext _context;

        public FlightReviewService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<FlightReviewDTO> CreateReviewAsync(FlightReviewDTO reviewDTO)
        {
            var tempFlight = await _context.Flights.FirstOrDefaultAsync(f => f.FlightID == reviewDTO.FlightId);
            if (tempFlight == null)
                throw new ArgumentException($"The flight with the given ID: {reviewDTO.FlightId} does not exist.");

            var reviewObjectForDB = new Review
            {
                UserID = reviewDTO.UserID,
                FlightID = reviewDTO.FlightId,
                Rating = reviewDTO.Rating,
                Comment = reviewDTO.Comment,
                Timestamp = reviewDTO.Timestamp
            };

            _context.Reviews.Add(reviewObjectForDB);
            await _context.SaveChangesAsync();

            reviewDTO.ReviewId = reviewObjectForDB.ReviewId;
            return reviewDTO;
        }

        public async Task<IEnumerable<FlightReviewDTO>> GetAllReviewsAsync()
        {
            var reviews = await _context.Reviews.Where(r => r.FlightID.HasValue).ToListAsync();
            return reviews.Select(review => new FlightReviewDTO
            {
                UserID = review.UserID,
                FlightId = review.FlightID!.Value,
                ReviewId = review.ReviewId,
                Rating = review.Rating,
                Comment = review.Comment,
                Timestamp = review.Timestamp
            }).ToList();
        }

        public async Task<IEnumerable<FlightReviewDTO>> GetReviewsByFlightAsync(int flightId)
        {
            var reviews = await _context.Reviews.Where(r => r.FlightID == flightId).ToListAsync();
            return reviews.Select(review => new FlightReviewDTO
            {
                UserID = review.UserID,
                FlightId = review.FlightID!.Value,
                ReviewId = review.ReviewId,
                Rating = review.Rating,
                Comment = review.Comment,
                Timestamp = review.Timestamp
            }).ToList();
        }

        public async Task<FlightReviewDTO?> UpdateReviewAsync(int reviewId, FlightReviewDTO reviewDTO)
        {
            var review = await _context.Reviews.FirstOrDefaultAsync(r => r.FlightID != null && r.ReviewId == reviewId);
            if (review == null)
                return null;

            review.UserID = reviewDTO.UserID;
            review.FlightID = reviewDTO.FlightId;
            review.Rating = reviewDTO.Rating;
            review.Comment = reviewDTO.Comment;
            review.Timestamp = reviewDTO.Timestamp;

            _context.Entry(review).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return new FlightReviewDTO
            {
                UserID = review.UserID,
                FlightId = review.FlightID!.Value,
                ReviewId = review.ReviewId,
                Rating = review.Rating,
                Comment = review.Comment,
                Timestamp = review.Timestamp
            };
        }

        public async Task<bool> DeleteReviewAsync(int reviewId)
        {
            var review = await _context.Reviews.FirstOrDefaultAsync(r => r.FlightID != null && r.ReviewId == reviewId);
            if (review == null)
                return false;

            _context.Reviews.Remove(review);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}