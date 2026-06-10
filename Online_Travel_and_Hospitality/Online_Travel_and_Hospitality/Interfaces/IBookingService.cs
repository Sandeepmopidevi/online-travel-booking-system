using Online_Travel_and_Hospitality.Models.Domain;
using Online_Travel_and_Hospitality.Models.DTO;

namespace Online_Travel_and_Hospitality.Interfaces
{
    public interface IBookingService
    {
        Task<int> CreateBookingAsync(BookingDTO booking);
        Task<IEnumerable<Booking>> GetAllBookingsAsync();
        Task<Booking?> GetBookingByIdAsync(int id);
        Task<Booking?> UpdateBookingAsync(int id, BookingDTO bookingDTO);
        Task<bool> DeleteBookingAsync(int id);
        Task<IEnumerable<Booking>> GetBookingsByUserAsync(int userId);
        Task<IEnumerable<Booking>> SearchBookingsAsync(int bookingId);
        Task<Booking?> CancelBookingAndRefundAsync(int id, BookingDTO bookingDTO);
    }
}