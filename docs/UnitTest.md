## FlightControllerTests.cs - Explanation (Line-by-Line)

```csharp
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
using Online_Travel_and_Hospitality.Repository.Implementations;
using Online_Travel_and_Hospitality.Interfaces;
```

* Imports required namespaces for tasks, Entity Framework Core, MVC, NUnit testing framework, and project-specific models/controllers/services.

```csharp
namespace DependencyInjectionTestProject
```

* Defines a namespace for the test project.

```csharp
[TestFixture]
public class FlightControllerTests
```

* Marks the class as a test fixture to be run by NUnit.

```csharp
private ApplicationDbContext _dbContext;
private IFlightService _flightService;
private FlightController _controller;
```

* Declares private fields for DbContext, service, and controller under test.

```csharp
[SetUp]
public void Setup()
```

* This method runs before each test. It initializes the database and dependencies.

```csharp
var options = new DbContextOptionsBuilder<ApplicationDbContext>()
    .UseInMemoryDatabase(Guid.NewGuid().ToString())
    .Options;
```

* Configures an in-memory database to isolate test data for each test.

```csharp
_dbContext = new ApplicationDbContext(options);
_flightService = new FlightService(_dbContext);
_controller = new FlightController(_flightService);
```

* Instantiates context, service, and controller with dependencies injected.

```csharp
[TearDown]
public void TearDown()
```

* Cleans up after each test to ensure test isolation.

```csharp
_dbContext.Database.EnsureDeleted();
_dbContext.Dispose();
```

* Deletes the in-memory DB and disposes context.

### Test: CreateFlights\_ValidFlight\_ShouldReturnOk

Tests POST endpoint.

```csharp
var flightDto = new FlightDTO { ... };
var result = await _controller.CreateFlights(flightDto);
```

* Creates DTO and posts it to controller.

```csharp
Assert.IsInstanceOf<OkObjectResult>(result);
```

* Asserts successful response.

```csharp
var createdFlight = okResult.Value as Flight;
Assert.That(createdFlight.Airline, Is.EqualTo(flightDto.Airline));
```

* Verifies returned flight properties match input.

### Test: GetFlights\_ShouldReturnListOfFlights

Tests GET all flights.

```csharp
_dbContext.Flights.Add(new Flight { ... });
_dbContext.SaveChanges();
```

* Seed a flight.

```csharp
var result = await _controller.GetFlights();
```

* Calls GetFlights.

```csharp
Assert.That(flights.Count(), Is.EqualTo(1));
```

* Checks if flight is returned.

### Test: GetFlight\_FlightExists\_ShouldReturnOk

```csharp
var flight = new Flight { FlightID = 1, ... };
_dbContext.Flights.Add(flight);
_dbContext.SaveChanges();
```

* Adds flight with ID.

```csharp
var result = await _controller.GetFlight(1);
```

* Gets flight by ID.

### Test: GetFlight\_FlightDoesNotExist\_ShouldReturnNotFound

* Calls `GetFlight(1)` without any data, expecting 404.

### Test: UpdateFlight\_FlightExists\_ShouldReturnOk

```csharp
var flightDto = new FlightDTO { Airline = "Updated Airline", ... };
var result = await _controller.UpdateFlight(1, flightDto);
```

* Updates existing flight and checks updated fields.

### Test: UpdateFlight\_FlightDoesNotExist\_ShouldReturnNotFound

* Tries to update non-existent flight ID.

### Test: DeleteFlight\_FlightExists\_ShouldReturnOk

```csharp
_dbContext.Flights.Add(new Flight { FlightID = 1, ... });
_dbContext.SaveChanges();
var result = await _controller.DeleteFlight(1);
```

* Deletes and verifies deletion.

### Test: DeleteFlight\_FlightDoesNotExist\_ShouldReturnNotFound

* Tries deleting flight with ID not present.

### Test: SearchFlights\_ByBoardingCity\_ShouldReturnMatchingFlights

* Adds flight and searches by BoardingCity.

### Test: SearchFlights\_ByDestinationCityAndDate\_ShouldReturnMatchingFlights

* Adds flight and searches by destination + date.

### Test: SearchFlights\_NoParameters\_ShouldReturnBadRequest

* Verifies that passing no filters returns `BadRequest`.

---
