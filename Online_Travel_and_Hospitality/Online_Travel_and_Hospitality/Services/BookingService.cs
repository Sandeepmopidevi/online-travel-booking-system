using Microsoft.EntityFrameworkCore;
using Online_Travel_and_Hospitality.Data;
using Online_Travel_and_Hospitality.Models.Domain;
using Online_Travel_and_Hospitality.Models.DTO;
using Online_Travel_and_Hospitality.Interfaces;

namespace Online_Travel_and_Hospitality.Services
{
    public class BookingService : IBookingService
    {
        private readonly ApplicationDbContext _context;

        public BookingService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<int> CreateBookingAsync(BookingDTO booking)
        {
            var tempUser = await _context.Users.FirstOrDefaultAsync(r => r.UserId == booking.UserId);
            if (tempUser == null)
                throw new ArgumentException($"User with ID {booking.UserId} does not exist.");

            var bookingObjectForDB = new Booking
            {
                Type = booking.Type,
                Status = booking.Status,
                UserID = booking.UserId,
                PaymentID = booking.PaymentId
            };

            _context.Bookings.Add(bookingObjectForDB);
            await _context.SaveChangesAsync();
            return bookingObjectForDB.BookingID;
        }

        public async Task<IEnumerable<Booking>> GetAllBookingsAsync()
        {
            return await _context.Bookings.ToListAsync();
        }

        public async Task<Booking?> GetBookingByIdAsync(int id)
        {
            return await _context.Bookings.FindAsync(id);
        }

        public async Task<Booking?> UpdateBookingAsync(int id, BookingDTO bookingDTO)
        {
            var booking = await _context.Bookings.FindAsync(id);
            if (booking == null)
                return null;

            booking.Type = bookingDTO.Type;
            booking.Status = bookingDTO.Status;
            booking.UserID = bookingDTO.UserId;
            booking.PaymentID = bookingDTO.PaymentId;

            _context.Entry(booking).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return booking;
        }

        public async Task<bool> DeleteBookingAsync(int id)
        {
            var booking = await _context.Bookings.FindAsync(id);
            if (booking == null)
                return false;

            _context.Bookings.Remove(booking);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<Booking>> GetBookingsByUserAsync(int userId)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null)
                throw new ArgumentException($"User with ID {userId} not found.");

            return await _context.Bookings.Where(b => b.UserID == userId).ToListAsync();
        }

        public async Task<IEnumerable<Booking>> SearchBookingsAsync(int bookingId)
        {
            IQueryable<Booking> query = _context.Bookings.Where(h => h.BookingID > 0);

            if (bookingId > 0)
            {
                query = query.Where(h => h.BookingID == bookingId);
            }

            return await query.ToListAsync();
        }

        public async Task<Booking?> CancelBookingAndRefundAsync(int id, BookingDTO bookingDTO)
        {
            var booking = await _context.Bookings.FindAsync(id);
            if (booking == null)
                return null;

            booking.Status = "Refunded";
            booking.PaymentID = 0; // Set to zero for refund, adjust as per logic

            _context.Entry(booking).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return booking;
        }
    }
}