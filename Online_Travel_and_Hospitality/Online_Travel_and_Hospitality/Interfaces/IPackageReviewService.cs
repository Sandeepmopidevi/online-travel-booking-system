using Online_Travel_and_Hospitality.Models.DTO;

namespace Online_Travel_and_Hospitality.Interfaces
{
    public interface IPackageReviewService
    {
        Task<PackageReviewDTO> CreateReviewAsync(PackageReviewDTO reviewDTO);
        Task<IEnumerable<PackageReviewDTO>> GetAllReviewsAsync();
        Task<IEnumerable<PackageReviewDTO>> GetReviewsByPackageAsync(int packageId);
        Task<PackageReviewDTO?> UpdateReviewAsync(int reviewId, PackageReviewDTO reviewDTO);
        Task<bool> DeleteReviewAsync(int reviewId);
    }
}