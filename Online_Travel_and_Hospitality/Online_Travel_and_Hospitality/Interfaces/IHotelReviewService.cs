using Online_Travel_and_Hospitality.Models.DTO;

namespace Online_Travel_and_Hospitality.Interfaces
{
    public interface IHotelReviewService
    {
        Task<HotelReviewDTO> CreateReviewAsync(HotelReviewDTO reviewDTO);
        Task<IEnumerable<HotelReviewDTO>> GetReviewsAsync();
        Task<HotelReviewDTO?> GetReviewByIdAsync(int id);
        Task<HotelReviewDTO?> UpdateReviewAsync(int id, HotelReviewDTO reviewDTO);
        Task<bool> DeleteReviewAsync(int id);
    }
}