using Online_Travel_and_Hospitality.Models.DTO;

namespace Online_Travel_and_Hospitality.Interfaces
{
    public interface IFlightReviewService
    {
        Task<FlightReviewDTO> CreateReviewAsync(FlightReviewDTO reviewDTO);
        Task<IEnumerable<FlightReviewDTO>> GetAllReviewsAsync();
        Task<IEnumerable<FlightReviewDTO>> GetReviewsByFlightAsync(int flightId);
        Task<FlightReviewDTO?> UpdateReviewAsync(int reviewId, FlightReviewDTO reviewDTO);
        Task<bool> DeleteReviewAsync(int reviewId);
    }
}