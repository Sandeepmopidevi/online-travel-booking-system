using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Moq;
using Online_Travel_and_Hospitality.Models.Domain;
using Online_Travel_and_Hospitality.Interfaces;

namespace DependencyInjectionTestProject
{
    // Unit tests for the HotelSearchService using Moq.
    [TestFixture]
    public class HotelSearchServiceTests
    {
        private Mock<IHotelService> _mockHotelSearchService;

        // Sets up the mock HotelSearchService before each test.
        [SetUp]
        public void Setup()
        {
            _mockHotelSearchService = new Mock<IHotelService>();
        }

        // Tests that SearchHotelsAsync returns a list of hotels when hotels exist.
        [Test]
        public async Task SearchHotelsAsync_HotelsExist_ShouldReturnHotels()
        {
            // Arrange: Mock a list of hotels with a specific name.
            var hotelName = "Test Hotel";
            var hotels = new List<Hotel>
            {
                new Hotel
                {
                    HotelID = 1,
                    Name = hotelName,
                    Location = "City A",
                    RoomsAvailable = 10,
                    Rating = 4.5,
                    PricePerNight = 150.00m
                }
            };

            // Configure the mock to return the hotels list for the given name.
            _mockHotelSearchService
                .Setup(service => service.SearchHotelsAsync(hotelName, "City A"))
                .ReturnsAsync(hotels);

            // Act: Call the mocked SearchHotelsAsync method.
            var result = await _mockHotelSearchService.Object.SearchHotelsAsync(hotelName, "City A");

            // Assert: Verify the result contains the expected hotel.
            Assert.IsNotNull(result);
            Assert.That(result.Count(), Is.EqualTo(1));
            Assert.That(result.First().Name, Is.EqualTo(hotelName));
        }


        // Tests that SearchHotelsAsync returns an empty list when no hotels exist.
        [Test]
        public async Task SearchHotelsAsync_NoHotelsExist_ShouldReturnEmptyList()
        {
            // Arrange: Mock an empty result for a non-existent hotel name.
            var hotelName = "Nonexistent Hotel";
            var locationName= "Nonexistent Location";

            _mockHotelSearchService
                .Setup(service => service.SearchHotelsAsync(hotelName,locationName))
                .ReturnsAsync(new List<Hotel>());

            // Act: Call the mocked SearchHotelsAsync method.
            var result = await _mockHotelSearchService.Object.SearchHotelsAsync(hotelName,locationName);

            // Assert: Verify the result is an empty list.
            Assert.IsNotNull(result);
            Assert.That(result.Count(), Is.EqualTo(0));
        }

        // Tests that SearchHotelsAsync throws an ArgumentException for an invalid hotel name.
        [Test]
        public void SearchHotelsAsync_InvalidArgument_ShouldThrowArgumentException()
        {
            // Arrange: Mock an exception for an invalid hotel name.
            var invalidHotelName = "";
            var invalidLocationName = "";

            // Configure the mock to throw an exception for invalid arguments.
            _mockHotelSearchService
                .Setup(service => service.SearchHotelsAsync(invalidHotelName, invalidLocationName))
                .ThrowsAsync(new ArgumentException("Invalid hotel name"));

            // Act & Assert: Verify the exception is thrown with the correct message.
            var ex = Assert.ThrowsAsync<ArgumentException>(async () =>
                await _mockHotelSearchService.Object.SearchHotelsAsync(invalidHotelName, invalidLocationName));
            Assert.That(ex.Message, Is.EqualTo("Invalid hotel name"));
        }
    }
}
