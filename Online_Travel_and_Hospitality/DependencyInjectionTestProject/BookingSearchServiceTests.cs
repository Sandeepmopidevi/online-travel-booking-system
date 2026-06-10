using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using Online_Travel_and_Hospitality.Data;
using Online_Travel_and_Hospitality.Models.Domain;
using Online_Travel_and_Hospitality.Models.DTO;
using Online_Travel_and_Hospitality.Services;

namespace DependencyInjectionTestProject
{
    [TestFixture]
    public class BookingServiceTests
    {
        private ApplicationDbContext _dbContext;
        private BookingService _service;

        [SetUp]
        public void Setup()
        {
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase(databaseName: "TestDatabase")
                .Options;
            _dbContext = new ApplicationDbContext(options);
            _service = new BookingService(_dbContext);
        }

        [TearDown]
        public void TearDown()
        {
            _dbContext.Database.EnsureDeleted();
            _dbContext.Dispose();
        }

        [Test]
        public async Task SearchBookingsAsync_BookingExists_ShouldReturnBooking()
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

            var results = await _service.SearchBookingsAsync(42);

            Assert.IsNotNull(results);
            Assert.IsTrue(results.Any(b => b.BookingID == 42));
        }

        [Test]
        public async Task SearchBookingsAsync_BookingDoesNotExist_ShouldReturnEmpty()
        {
            var results = await _service.SearchBookingsAsync(999);

            Assert.IsNotNull(results);
            Assert.IsEmpty(results);
        }
    }
}