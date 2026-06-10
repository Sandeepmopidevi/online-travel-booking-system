using Microsoft.EntityFrameworkCore;
using Online_Travel_and_Hospitality.Data;
using Online_Travel_and_Hospitality.Interfaces;
using Online_Travel_and_Hospitality.Models.DTO;

namespace Online_Travel_and_Hospitality.Services
{
    public class HotelReviewService : IHotelReviewService
    {
        private readonly ApplicationDbContext _context;

        public HotelReviewService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<HotelReviewDTO> CreateReviewAsync(HotelReviewDTO reviewDTO)
        {
            var tempHotel = await _context.Hotels.FirstOrDefaultAsync(h => h.HotelID == reviewDTO.HotelId);
            if (tempHotel == null)
                throw new ArgumentException($"This Hotel with the given ID: {reviewDTO.HotelId} does not exist");

            var review = new Review
            {
                UserID = reviewDTO.UserID,
                HotelId = reviewDTO.HotelId,
                Rating = reviewDTO.Rating,
                Comment = reviewDTO.Comment,
                Timestamp = reviewDTO.Timestamp.UtcDateTime
            };

            _context.Reviews.Add(review);
            await _context.SaveChangesAsync();

            reviewDTO.ReviewId = review.ReviewId;

            return reviewDTO;
        }

        public async Task<IEnumerable<HotelReviewDTO>> GetReviewsAsync()
        {
            var list_of_Reviews = await _context.Reviews.ToListAsync();

            return list_of_Reviews
                .Where(r => r.HotelId.HasValue)
                .Select(r => new HotelReviewDTO
                {
                    UserID = r.UserID,
                    HotelId = r.HotelId.Value,
                    ReviewId = r.ReviewId,
                    Rating = r.Rating,
                    Comment = r.Comment,
                    Timestamp = new DateTimeOffset(r.Timestamp)
                }).ToList();
        }

        public async Task<HotelReviewDTO?> GetReviewByIdAsync(int id)
        {
            var review = await _context.Reviews.FindAsync(id);
            if (review == null) return null;

            return new HotelReviewDTO
            {
                UserID = review.UserID,
                HotelId = review.HotelId.Value,
                ReviewId = review.ReviewId,
                Rating = review.Rating,
                Comment = review.Comment,
                Timestamp = new DateTimeOffset(review.Timestamp)
            };
        }

        public async Task<HotelReviewDTO?> UpdateReviewAsync(int id, HotelReviewDTO reviewDTO)
        {
            var review = await _context.Reviews.FindAsync(id);
            if (review == null) return null;

            review.UserID = reviewDTO.UserID;
            review.HotelId = reviewDTO.HotelId;
            review.Rating = reviewDTO.Rating;
            review.Comment = reviewDTO.Comment;
            review.Timestamp = reviewDTO.Timestamp.UtcDateTime;

            _context.Entry(review).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return new HotelReviewDTO
            {
                UserID = review.UserID,
                HotelId = review.HotelId.Value,
                ReviewId = review.ReviewId,
                Rating = review.Rating,
                Comment = review.Comment,
                Timestamp = new DateTimeOffset(review.Timestamp)
            };
        }

        public async Task<bool> DeleteReviewAsync(int id)
        {
            var review = await _context.Reviews.FindAsync(id);
            if (review == null)
                return false;

            _context.Reviews.Remove(review);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}