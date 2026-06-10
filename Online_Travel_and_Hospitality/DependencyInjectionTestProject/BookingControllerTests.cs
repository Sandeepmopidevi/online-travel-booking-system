using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using Online_Travel_and_Hospitality.Controllers;
using Online_Travel_and_Hospitality.Data;
using Online_Travel_and_Hospitality.Models.Domain;
using Online_Travel_and_Hospitality.Models.DTO;
using Online_Travel_and_Hospitality.Services;
using Online_Travel_and_Hospitality.Interfaces;

namespace DependencyInjectionTestProject
{
    // Unit tests for the BookingController using the BookingService (with DI).
    public class BookingControllerTests
    {
        private ApplicationDbContext _dbContext;
        private IBookingService _bookingService;
        private BookingController _controller;

        [SetUp]
        public void Setup()
        {
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase(databaseName: "TestDatabase")
                .Options;

            _dbContext = new ApplicationDbContext(options);
            _bookingService = new BookingService(_dbContext);
            _controller = new BookingController(_bookingService);
        }

        [TearDown]
        public void TearDown()
        {
            _dbContext.Database.EnsureDeleted();
            _dbContext.Dispose();
        }

        [Test]
        public async Task CreateBooking_InvalidUser_ShouldReturnBadRequest()
        {
            var bookingDto = new BookingDTO
            {
                UserId = 999, // Non-existent user
                Type = "Hotel",
                Status = "Confirmed",
                PaymentId = 101
            };

            var result = await _controller.CreateBooking(bookingDto);

            Assert.IsInstanceOf<BadRequestObjectResult>(result);
            var badRequest = result as BadRequestObjectResult;
            Assert.IsTrue(badRequest.Value.ToString().Contains("does not exist"));
        }

        [Test]
        public async Task GetBookings_ShouldReturnListOfBookings()
        {
            // Arrange: Add a booking to the database.
            _dbContext.Bookings.Add(new Booking
            {
                BookingID = 1,
                UserID = 1,
                Type = "Hotel",
                Status = "Confirmed",
                PaymentID = 101
            });
            _dbContext.SaveChanges();

            // Act: Call the GetBookings method.
            var result = await _controller.GetBookings();

            // Assert: Verify the response contains the expected booking.
            Assert.IsInstanceOf<OkObjectResult>(result);
            var okResult = result as OkObjectResult;
            Assert.IsNotNull(okResult);
            var returnedBookings = okResult.Value as IEnumerable<Booking>;
            Assert.AreEqual(1, returnedBookings.Count());
            Assert.AreEqual("Hotel", returnedBookings.First().Type);
        }

        [Test]
        public async Task GetBookingById_BookingExists_ShouldReturnOk()
        {
            // Arrange: Add a booking to the database.
            _dbContext.Bookings.Add(new Booking
            {
                BookingID = 1,
                UserID = 1,
                Type = "Hotel",
                Status = "Confirmed",
                PaymentID = 101
            });
            _dbContext.SaveChanges();

            // Act: Call the GetBooking method with a valid ID.
            var result = await _controller.GetBooking(1);

            // Assert: Verify the response is OkObjectResult and contains the correct booking.
            Assert.IsInstanceOf<OkObjectResult>(result);
            var okResult = result as OkObjectResult;
            Assert.IsNotNull(okResult);
            var returnedBooking = okResult.Value as Booking;
            Assert.AreEqual(1, returnedBooking.BookingID);
        }

        [Test]
        public async Task GetBookingById_BookingDoesNotExist_ShouldReturnNotFound()
        {
            var result = await _controller.GetBooking(1);
            Assert.IsInstanceOf<NotFoundObjectResult>(result);
        }

        [Test]
        public async Task UpdateBooking_BookingExists_ShouldReturnOk()
        {
            // Arrange: Add a booking to the database.
            _dbContext.Bookings.Add(new Booking
            {
                BookingID = 1,
                UserID = 1,
                Type = "Hotel",
                Status = "Pending",
                PaymentID = 101
            });
            _dbContext.SaveChanges();

            var bookingDto = new BookingDTO
            {
                UserId = 1,
                Type = "Hotel",
                Status = "Confirmed",
                PaymentId = 101
            };

            // Act: Call the UpdateBooking method with updated details.
            var result = await _controller.UpdateBooking(1, bookingDto);

            // Assert: Verify the response is OkObjectResult and the booking is updated.
            Assert.IsInstanceOf<OkObjectResult>(result);
            var okResult = result as OkObjectResult;
            Assert.IsNotNull(okResult);
            var updatedBooking = _dbContext.Bookings.FirstOrDefault(b => b.BookingID == 1);
            Assert.AreEqual("Confirmed", updatedBooking.Status);
        }

        [Test]
        public async Task UpdateBooking_BookingDoesNotExist_ShouldReturnNotFound()
        {
            var bookingDto = new BookingDTO
            {
                UserId = 1,
                Type = "Hotel",
                Status = "Confirmed",
                PaymentId = 101
            };

            var result = await _controller.UpdateBooking(1, bookingDto);

            Assert.IsInstanceOf<NotFoundObjectResult>(result);
        }

        [Test]
        public async Task DeleteBooking_BookingExists_ShouldReturnOk()
        {
            _dbContext.Bookings.Add(new Booking
            {
                BookingID = 1,
                UserID = 1,
                Type = "Hotel",
                Status = "Confirmed",
                PaymentID = 101
            });
            _dbContext.SaveChanges();

            var result = await _controller.DeleteBooking(1);

            Assert.IsInstanceOf<OkObjectResult>(result);
            Assert.IsNull(_dbContext.Bookings.FirstOrDefault(b => b.BookingID == 1));
        }

        [Test]
        public async Task DeleteBooking_BookingDoesNotExist_ShouldReturnNotFound()
        {
            var result = await _controller.DeleteBooking(1);
            Assert.IsInstanceOf<NotFoundObjectResult>(result);
        }

        [Test]
        public async Task GetBookingsByUser_UserExistsWithBookings_ReturnsOk()
        {
            _dbContext.Users.Add(new User
            {
                UserId = 1,
                Name = "Test User",
                Email = "testuser@example.com",
                Password = "TestPassword123",
                Role = "Customer",
                ContactNumber = "1234567890"
            });
            _dbContext.Bookings.Add(new Booking
            {
                BookingID = 1,
                UserID = 1,
                Type = "Hotel",
                Status = "Confirmed",
                PaymentID = 101
            });
            _dbContext.SaveChanges();

            var result = await _controller.GetBookingsByUser(1);

            Assert.IsInstanceOf<OkObjectResult>(result);
            var okResult = result as OkObjectResult;
            var bookings = okResult.Value as IEnumerable<Booking>;
            Assert.IsNotNull(bookings);
            Assert.AreEqual(1, bookings.Count());
        }

        [Test]
        public async Task GetBookingsByUser_UserExistsWithNoBookings_ReturnsNotFound()
        {
            _dbContext.Users.Add(new User
            {
                UserId = 1,
                Name = "Test User",
                Email = "testuser@example.com",
                Password = "TestPassword123",
                Role = "Customer",
                ContactNumber = "1234567890"
            });
            _dbContext.SaveChanges();

            var result = await _controller.GetBookingsByUser(1);

            Assert.IsInstanceOf<NotFoundObjectResult>(result);
        }

        [Test]
        public async Task GetBookingsByUser_UserDoesNotExist_ReturnsNotFound()
        {
            var result = await _controller.GetBookingsByUser(999);
            Assert.IsInstanceOf<NotFoundObjectResult>(result);
        }

        [Test]
        public async Task SearchBookings_ReturnsMatchingBookings()
        {
            _dbContext.Bookings.Add(new Booking
            {
                BookingID = 42,
                UserID = 2,
                Type = "Flight",
                Status = "Confirmed",
                PaymentID = 202
            });
            _dbContext.SaveChanges();

            var result = await _controller.SearchBookings(42);

            Assert.IsInstanceOf<OkObjectResult>(result);
            var okResult = result as OkObjectResult;
            var bookings = okResult.Value as IEnumerable<Booking>;
            Assert.IsTrue(bookings.Any(b => b.BookingID == 42));
        }

        [Test]
        public async Task CancelBookingAndRefund_BookingExists_ShouldReturnOk()
        {
            _dbContext.Bookings.Add(new Booking
            {
                BookingID = 1,
                UserID = 1,
                Type = "Hotel",
                Status = "Confirmed",
                PaymentID = 101
            });
            _dbContext.SaveChanges();

            var bookingDto = new BookingDTO
            {
                UserId = 1,
                Type = "Hotel",
                Status = "Refunded",
                PaymentId = 0
            };

            var result = await _controller.CancelBookingAndRefund(1, bookingDto);

            Assert.IsInstanceOf<OkObjectResult>(result);
            var okResult = result as OkObjectResult;
            var booking = okResult.Value as Booking;
            Assert.IsNotNull(booking);
            Assert.AreEqual("Refunded", booking.Status);
            Assert.AreEqual(0, booking.PaymentID);
        }

        [Test]
        public async Task CancelBookingAndRefund_BookingDoesNotExist_ShouldReturnNotFound()
        {
            var bookingDto = new BookingDTO
            {
                UserId = 1,
                Type = "Hotel",
                Status = "Refunded",
                PaymentId = 0
            };

            var result = await _controller.CancelBookingAndRefund(1, bookingDto);

            Assert.IsInstanceOf<NotFoundObjectResult>(result);
        }
    }
}