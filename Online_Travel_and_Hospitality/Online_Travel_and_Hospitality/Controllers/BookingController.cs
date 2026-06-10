using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Online_Travel_and_Hospitality.Interfaces;
using Online_Travel_and_Hospitality.Models.DTO;

namespace Online_Travel_and_Hospitality.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        private readonly IBookingService _bookingService;

        public BookingController(IBookingService bookingService)
        {
            _bookingService = bookingService;
        }

        [HttpPost]
        [Route("CreateBooking")]
        [Authorize(Roles = "Admin,Traveller")]
        public async Task<IActionResult> CreateBooking(BookingDTO booking)
        {
            try
            {
                var bookingId = await _bookingService.CreateBookingAsync(booking);
                return Ok(new { BookingId = bookingId });
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet]
        [Route("GetBookings")]
        [Authorize(Roles = "Admin, Hotel Manager")]
        public async Task<IActionResult> GetBookings()
        {
            var bookings = await _bookingService.GetAllBookingsAsync();
            return Ok(bookings);
        }

        [HttpGet]
        [Route("GetBooking/{id}")]
        [Authorize(Roles = "Traveller, Admin, Hotel Manager")]
        public async Task<IActionResult> GetBooking(int id)
        {
            var booking = await _bookingService.GetBookingByIdAsync(id);
            if (booking == null)
                return NotFound(new { message = "Booking not found" });
            return Ok(booking);
        }

        [HttpPut]
        [Route("UpdateBooking/{id}")]
        [Authorize(Roles = "Admin, Hotel Manager")]
        public async Task<IActionResult> UpdateBooking(int id, BookingDTO bookingDTO)
        {
            var updatedBooking = await _bookingService.UpdateBookingAsync(id, bookingDTO);
            if (updatedBooking == null)
                return NotFound(new { message = "Booking not found" });
            return Ok(updatedBooking);
        }

        [HttpDelete]
        [Route("DeleteBooking/{id}")]
        [Authorize(Roles = "Admin, Hotel Manager")]
        public async Task<IActionResult> DeleteBooking(int id)
        {
            var result = await _bookingService.DeleteBookingAsync(id);
            if (!result)
                return NotFound(new { message = "Booking not found" });
            return Ok(new { message = "Booking deleted successfully" });
        }

        [HttpGet]
        [Route("GetBookingsByUser/{userId}")]
        [Authorize(Roles = "Admin, Traveller, Hotel Manager")]
        public async Task<IActionResult> GetBookingsByUser(int userId)
        {
            try
            {
                var bookings = await _bookingService.GetBookingsByUserAsync(userId);
                if (!bookings.Any())
                {
                    return NotFound(new { message = "No bookings found for this user." });
                }
                return Ok(bookings);
            }
            catch (ArgumentException ex)
            {
                return NotFound(new { message = ex.Message });
            }
        }

        [HttpGet]
        [Route("SearchBookings")]
        [Authorize(Roles = "Admin, Traveller, Hotel Manager, Travel Agent")]
        public async Task<IActionResult> SearchBookings([FromQuery] int BookingID)
        {
            var bookings = await _bookingService.SearchBookingsAsync(BookingID);
            return Ok(bookings);
        }

        [HttpPut]
        [Route("CancelBookingAndRefund/{id}")]
        [Authorize(Roles = "Admin,Traveller,Hotel Manager,TravelAgent")]
        public async Task<IActionResult> CancelBookingAndRefund(int id, BookingDTO bookingDTO)
        {
            var booking = await _bookingService.CancelBookingAndRefundAsync(id, bookingDTO);
            if (booking == null)
                return NotFound(new { message = "Booking not found" });
            return Ok(booking);
        }
    }
}