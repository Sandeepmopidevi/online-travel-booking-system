using Microsoft.EntityFrameworkCore;
using Online_Travel_and_Hospitality.Data;
using Online_Travel_and_Hospitality.Interfaces;
using Online_Travel_and_Hospitality.Models.DTO;

namespace Online_Travel_and_Hospitality.Services
{
    public class PackageReviewService : IPackageReviewService
    {
        private readonly ApplicationDbContext _context;

        public PackageReviewService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<PackageReviewDTO> CreateReviewAsync(PackageReviewDTO reviewDTO)
        {
            var tempPackage = await _context.Packages.FirstOrDefaultAsync(p => p.PackageID == reviewDTO.PackageId);
            if (tempPackage == null)
                throw new ArgumentException($"The package with the given ID: {reviewDTO.PackageId} does not exist.");

            var review = new Review
            {
                UserID = reviewDTO.UserID,
                PackageId = reviewDTO.PackageId,
                Rating = reviewDTO.Rating,
                Comment = reviewDTO.Comment,
                Timestamp = reviewDTO.Timestamp
            };

            _context.Reviews.Add(review);
            await _context.SaveChangesAsync();
            reviewDTO.ReviewId = review.ReviewId;
            return reviewDTO;
        }

        public async Task<IEnumerable<PackageReviewDTO>> GetAllReviewsAsync()
        {
            var reviews = await _context.Reviews.Where(r => r.PackageId.HasValue).ToListAsync();
            return reviews.Select(review => new PackageReviewDTO
            {
                UserID = review.UserID,
                PackageId = review.PackageId!.Value,
                ReviewId = review.ReviewId,
                Rating = review.Rating,
                Comment = review.Comment,
                Timestamp = review.Timestamp
            }).ToList();
        }

        public async Task<IEnumerable<PackageReviewDTO>> GetReviewsByPackageAsync(int packageId)
        {
            var reviews = await _context.Reviews.Where(r => r.PackageId == packageId).ToListAsync();
            return reviews.Select(review => new PackageReviewDTO
            {
                UserID = review.UserID,
                PackageId = review.PackageId!.Value,
                ReviewId = review.ReviewId,
                Rating = review.Rating,
                Comment = review.Comment,
                Timestamp = review.Timestamp
            }).ToList();
        }

        public async Task<PackageReviewDTO?> UpdateReviewAsync(int reviewId, PackageReviewDTO reviewDTO)
        {
            var review = await _context.Reviews.FirstOrDefaultAsync(r => r.PackageId != null && r.ReviewId == reviewId);
            if (review == null)
                return null;

            review.UserID = reviewDTO.UserID;
            review.PackageId = reviewDTO.PackageId;
            review.Rating = reviewDTO.Rating;
            review.Comment = reviewDTO.Comment;
            review.Timestamp = reviewDTO.Timestamp;

            _context.Entry(review).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            reviewDTO.ReviewId = review.ReviewId;
            return reviewDTO;
        }

        public async Task<bool> DeleteReviewAsync(int reviewId)
        {
            var review = await _context.Reviews.FirstOrDefaultAsync(r => r.PackageId != null && r.ReviewId == reviewId);
            if (review == null)
                return false;

            _context.Reviews.Remove(review);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}