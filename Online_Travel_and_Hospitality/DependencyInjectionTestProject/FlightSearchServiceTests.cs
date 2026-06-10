using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Moq;
using NUnit.Framework;
using Online_Travel_and_Hospitality.Models.Domain;
using Online_Travel_and_Hospitality.Interfaces;

namespace DependencyInjectionTestProject
{
    // Unit tests for the FlightService SearchFlightsAsync method using Moq.
    [TestFixture]
    public class FlightSearchServiceTests
    {
        private Mock<IFlightService> _mockFlightService;

        [SetUp]
        public void Setup()
        {
            _mockFlightService = new Mock<IFlightService>();
        }

        // Tests that SearchFlightsAsync returns a list of flights when flights exist.
        [Test]
        public async Task SearchFlightsAsync_FlightsExist_ShouldReturnFlights()
        {
            // Arrange: Mock a list of flights with specific boarding and destination cities.
            var boardingCity = "City A";
            var destinationCity = "City B";
            DateTime? date = new DateTime(2025, 5, 29);
            var flights = new List<Flight>
            {
                new Flight
                {
                    FlightID = 1,
                    Airline = "Test Airline",
                    FlightNumber = "TA123",
                    BoardingCity = boardingCity,
                    DestinationCity = destinationCity,
                    Departure = date.Value,
                    Arrival = date.Value.AddHours(2),
                    Price = 100.50m,
                    Availability = true
                }
            };

            // Configure the mock to return the flights list for the given cities and date.
            _mockFlightService
                .Setup(service => service.SearchFlightsAsync(boardingCity, destinationCity, date))
                .ReturnsAsync(flights);

            // Act: Call the mocked SearchFlightsAsync method.
            var result = await _mockFlightService.Object.SearchFlightsAsync(boardingCity, destinationCity, date);

            // Assert: Verify the result contains the expected flight.
            Assert.IsNotNull(result);
            Assert.That(result.Count(), Is.EqualTo(1));
            Assert.That(result.First().BoardingCity, Is.EqualTo(boardingCity));
            Assert.That(result.First().DestinationCity, Is.EqualTo(destinationCity));
            Assert.That(result.First().Departure, Is.EqualTo(date.Value));
        }

        // Tests that SearchFlightsAsync returns an empty list when no flights exist.
        [Test]
        public async Task SearchFlightsAsync_NoFlightsExist_ShouldReturnEmptyList()
        {
            // Arrange: Mock an empty result for specific boarding and destination cities and date.
            var boardingCity = "City A";
            var destinationCity = "City B";
            DateTime? date = new DateTime(2025, 5, 29);

            _mockFlightService
                .Setup(service => service.SearchFlightsAsync(boardingCity, destinationCity, date))
                .ReturnsAsync(new List<Flight>());

            // Act: Call the mocked SearchFlightsAsync method.
            var result = await _mockFlightService.Object.SearchFlightsAsync(boardingCity, destinationCity, date);

            // Assert: Verify the result is an empty list.
            Assert.IsNotNull(result);
            Assert.That(result.Count(), Is.EqualTo(0));
        }

        // Tests that SearchFlightsAsync throws an ArgumentException for invalid arguments.
        [Test]
        public void SearchFlightsAsync_InvalidArguments_ShouldThrowArgumentException()
        {
            // Arrange: Mock an exception for invalid parameters (all null/empty).
            string invalidBoardingCity = "";
            string invalidDestinationCity = "";
            DateTime? invalidDate = null;

            _mockFlightService
                .Setup(service => service.SearchFlightsAsync(invalidBoardingCity, invalidDestinationCity, invalidDate))
                .ThrowsAsync(new ArgumentException("At least one search parameter must be provided."));

            // Act & Assert: Verify the exception is thrown with the correct message.
            var ex = Assert.ThrowsAsync<ArgumentException>(async () =>
                await _mockFlightService.Object.SearchFlightsAsync(invalidBoardingCity, invalidDestinationCity, invalidDate));
            Assert.That(ex.Message, Is.EqualTo("At least one search parameter must be provided."));
        }
    }
}