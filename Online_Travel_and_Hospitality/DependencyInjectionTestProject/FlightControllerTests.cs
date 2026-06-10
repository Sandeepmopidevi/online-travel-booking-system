using System;
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
    [TestFixture]
    public class FlightControllerTests
    {
        private ApplicationDbContext _dbContext;
        private IFlightService _flightService;
        private FlightController _controller;

        [SetUp]
        public void Setup()
        {
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString()) // Unique DB per test
                .Options;

            _dbContext = new ApplicationDbContext(options);
            _flightService = new FlightService(_dbContext);
            _controller = new FlightController(_flightService);
        }

        [TearDown]
        public void TearDown()
        {
            _dbContext.Database.EnsureDeleted();
            _dbContext.Dispose();
        }

        [Test]
        public async Task CreateFlights_ValidFlight_ShouldReturnOk()
        {
            var flightDto = new FlightDTO
            {
                Airline = "Test Airline",
                FlightNumber = "TA123",
                BoardingCity = "City A",
                DestinationCity = "City B",
                Departure = DateTime.Now,
                Arrival = DateTime.Now.AddHours(2),
                Price = 100.50m,
                Availability = true
            };

            var result = await _controller.CreateFlights(flightDto);

            Assert.IsInstanceOf<OkObjectResult>(result);
            var okResult = result as OkObjectResult;
            Assert.IsNotNull(okResult);

            var createdFlight = okResult.Value as Flight;
            Assert.IsNotNull(createdFlight);
            Assert.That(createdFlight.Airline, Is.EqualTo(flightDto.Airline));
            Assert.That(createdFlight.FlightNumber, Is.EqualTo(flightDto.FlightNumber));
        }

        [Test]
        public async Task GetFlights_ShouldReturnListOfFlights()
        {
            _dbContext.Flights.Add(new Flight
            {
                Airline = "Test Airline",
                FlightNumber = "TA123",
                BoardingCity = "City A",
                DestinationCity = "City B",
                Departure = DateTime.Now,
                Arrival = DateTime.Now.AddHours(2),
                Price = 100.50m,
                Availability = true
            });
            _dbContext.SaveChanges();

            var result = await _controller.GetFlights();

            Assert.IsInstanceOf<OkObjectResult>(result);
            var okResult = result as OkObjectResult;
            Assert.IsNotNull(okResult);
            var flights = okResult.Value as IEnumerable<Flight>;
            Assert.IsNotNull(flights);
            Assert.That(flights.Count(), Is.EqualTo(1));
            Assert.That(flights.First().Airline, Is.EqualTo("Test Airline"));
        }

        [Test]
        public async Task GetFlight_FlightExists_ShouldReturnOk()
        {
            var flight = new Flight
            {
                FlightID = 1,
                Airline = "Test Airline",
                FlightNumber = "TA123",
                BoardingCity = "City A",
                DestinationCity = "City B",
                Departure = DateTime.Now,
                Arrival = DateTime.Now.AddHours(2),
                Price = 100.50m,
                Availability = true
            };
            _dbContext.Flights.Add(flight);
            _dbContext.SaveChanges();

            var result = await _controller.GetFlight(1);

            Assert.IsInstanceOf<OkObjectResult>(result);
            var okResult = result as OkObjectResult;
            Assert.IsNotNull(okResult);
            var returnedFlight = okResult.Value as Flight;
            Assert.IsNotNull(returnedFlight);
            Assert.That(returnedFlight.FlightID, Is.EqualTo(1));
        }

        [Test]
        public async Task GetFlight_FlightDoesNotExist_ShouldReturnNotFound()
        {
            var result = await _controller.GetFlight(1);
            Assert.IsInstanceOf<NotFoundResult>(result);
        }

        [Test]
        public async Task UpdateFlight_FlightExists_ShouldReturnOk()
        {
            var flight = new Flight
            {
                FlightID = 1,
                Airline = "Test Airline",
                FlightNumber = "TA123",
                BoardingCity = "City A",
                DestinationCity = "City B",
                Departure = DateTime.Now,
                Arrival = DateTime.Now.AddHours(2),
                Price = 100.50m,
                Availability = true
            };
            _dbContext.Flights.Add(flight);
            _dbContext.SaveChanges();

            var flightDto = new FlightDTO
            {
                Airline = "Updated Airline",
                FlightNumber = "TA123",
                BoardingCity = "City A",
                DestinationCity = "City B",
                Departure = DateTime.Now,
                Arrival = DateTime.Now.AddHours(2),
                Price = 150.75m,
                Availability = false
            };

            var result = await _controller.UpdateFlight(1, flightDto);

            Assert.IsInstanceOf<OkObjectResult>(result);
            var okResult = result as OkObjectResult;
            Assert.IsNotNull(okResult);
            var updatedFlight = _dbContext.Flights.FirstOrDefault(f => f.FlightID == 1);
            Assert.IsNotNull(updatedFlight);
            Assert.That(updatedFlight.Airline, Is.EqualTo(flightDto.Airline));
            Assert.That(updatedFlight.Price, Is.EqualTo(flightDto.Price));
            Assert.That(updatedFlight.Availability, Is.EqualTo(flightDto.Availability));
        }

        [Test]
        public async Task UpdateFlight_FlightDoesNotExist_ShouldReturnNotFound()
        {
            var flightDto = new FlightDTO
            {
                Airline = "Updated Airline",
                FlightNumber = "TA123",
                BoardingCity = "City A",
                DestinationCity = "City B",
                Departure = DateTime.Now,
                Arrival = DateTime.Now.AddHours(2),
                Price = 150.75m,
                Availability = false
            };

            var result = await _controller.UpdateFlight(99, flightDto);

            Assert.IsInstanceOf<NotFoundResult>(result);
        }

        [Test]
        public async Task DeleteFlight_FlightExists_ShouldReturnOk()
        {
            var flight = new Flight
            {
                FlightID = 1,
                Airline = "Test Airline",
                FlightNumber = "TA123",
                BoardingCity = "City A",
                DestinationCity = "City B",
                Departure = DateTime.Now,
                Arrival = DateTime.Now.AddHours(2),
                Price = 100.50m,
                Availability = true
            };
            _dbContext.Flights.Add(flight);
            _dbContext.SaveChanges();

            var result = await _controller.DeleteFlight(1);

            Assert.IsInstanceOf<OkObjectResult>(result);
            Assert.IsNull(_dbContext.Flights.FirstOrDefault(f => f.FlightID == 1));
        }

        [Test]
        public async Task DeleteFlight_FlightDoesNotExist_ShouldReturnNotFound()
        {
            var result = await _controller.DeleteFlight(1);
            Assert.IsInstanceOf<NotFoundObjectResult>(result);
        }

        [Test]
        public async Task SearchFlights_ByBoardingCity_ShouldReturnMatchingFlights()
        {
            _dbContext.Flights.Add(new Flight
            {
                Airline = "Test Airline",
                FlightNumber = "TA123",
                BoardingCity = "Hyderabad",
                DestinationCity = "Delhi",
                Departure = new DateTime(2025, 5, 29, 10, 0, 0),
                Arrival = new DateTime(2025, 5, 29, 12, 0, 0),
                Price = 200,
                Availability = true
            });
            _dbContext.SaveChanges();

            var result = await _controller.SearchFlights("Hyderabad", null, null);

            Assert.IsInstanceOf<OkObjectResult>(result);
            var okResult = result as OkObjectResult;
            var flights = okResult.Value as IEnumerable<Flight>;
            Assert.IsNotNull(flights);
            Assert.IsTrue(flights.Any(f => f.BoardingCity == "Hyderabad"));
        }

        [Test]
        public async Task SearchFlights_ByDestinationCityAndDate_ShouldReturnMatchingFlights()
        {
            _dbContext.Flights.Add(new Flight
            {
                Airline = "Test Airline",
                FlightNumber = "TA124",
                BoardingCity = "Mumbai",
                DestinationCity = "Chennai",
                Departure = new DateTime(2025, 6, 1, 9, 0, 0),
                Arrival = new DateTime(2025, 6, 1, 12, 0, 0),
                Price = 250,
                Availability = true
            });
            _dbContext.SaveChanges();

            var result = await _controller.SearchFlights(null, "Chennai", new DateTime(2025, 6, 1));

            Assert.IsInstanceOf<OkObjectResult>(result);
            var okResult = result as OkObjectResult;
            var flights = okResult.Value as IEnumerable<Flight>;
            Assert.IsNotNull(flights);
            Assert.IsTrue(flights.Any(f => f.DestinationCity == "Chennai" && f.Departure.Date == new DateTime(2025, 6, 1)));
        }

        [Test]
        public async Task SearchFlights_NoParameters_ShouldReturnBadRequest()
        {
            var result = await _controller.SearchFlights(null, null, null);

            Assert.IsInstanceOf<BadRequestObjectResult>(result);
            var badResult = result as BadRequestObjectResult;
            Assert.IsTrue(badResult.Value.ToString().Contains("At least one search parameter"));
        }
    }
}