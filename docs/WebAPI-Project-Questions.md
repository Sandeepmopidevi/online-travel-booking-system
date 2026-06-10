# Top 100 C# .NET Web API Interview Questions (with Stayora Project Examples & Simple Answers)

---

### 1. What is ASP.NET Core Web API?
**Answer:**  
A framework for building RESTful HTTP services using C#.  
**Stayora Example:**  
Used for all backend APIs like bookings, hotels, and authentication.

---

### 2. What is a controller in Web API?
**Answer:**  
A class that handles HTTP requests and returns responses.  
**Stayora Example:**  
`HotelsController` manages hotel-related actions.

---

### 3. What is an action method?
**Answer:**  
A method in a controller that handles a specific HTTP request (like GET, POST).  
**Stayora Example:**  
`BookHotel` is an action that lets travellers book hotels.

---

### 4. How do you return JSON data from a Web API?
**Answer:**  
By default, Web API returns JSON.  
**Stayora Example:**  
All booking and hotel data is returned as JSON.

---

### 5. What is dependency injection?
**Answer:**  
A pattern that provides class dependencies from outside the class.  
**Stayora Example:**  
`HotelsController` gets `IHotelService` via constructor injection.

---

### 6. What is middleware?
**Answer:**  
Code that handles requests/responses in the HTTP pipeline.  
**Stayora Example:**  
Authentication and error handling are added as middleware.

---

### 7. How do you secure an API with JWT?
**Answer:**  
By validating JWT tokens in requests.  
**Stayora Example:**  
Travellers must be logged in (with a token) to book or pay.

---

### 8. What is model validation?
**Answer:**  
Checking input models for required fields/rules.  
**Stayora Example:**  
Rejects bookings if required info (like dates) is missing.

---

### 9. What is routing in Web API?
**Answer:**  
Mapping URLs to controller actions.  
**Stayora Example:**  
`/api/hotels` routes to `HotelsController`.

---

### 10. What is attribute routing?
**Answer:**  
Using attributes to define routes on controllers and actions.  
**Stayora Example:**  
`[Route("api/hotels")]` on `HotelsController`.

---

### 11. How do you enable CORS in Web API?
**Answer:**  
By adding CORS middleware and policies.  
**Stayora Example:**  
Allows Angular frontend to call API from another domain.

---

### 12. What is Entity Framework Core?
**Answer:**  
An ORM for working with databases as C# objects.  
**Stayora Example:**  
Used for all database access (hotels, users, bookings).

---

### 13. What is DbContext?
**Answer:**  
A class for managing database operations.  
**Stayora Example:**  
`ApplicationDbContext` handles Stayora tables.

---

### 14. What are DTOs?
**Answer:**  
Data Transfer Objects for sending/receiving data.  
**Stayora Example:**  
`BookingDto` is used to send booking data.

---

### 15. What is AutoMapper?
**Answer:**  
A library to map between models and DTOs.  
**Stayora Example:**  
Maps `Hotel` entity to `HotelDto`.

---

### 16. What is Swagger?
**Answer:**  
A tool for documenting/testing APIs.  
**Stayora Example:**  
Swagger UI lets you try Stayora’s API endpoints.

---

### 17. How do you create a GET endpoint?
**Answer:**  
Use `[HttpGet]` attribute in controller.  
**Stayora Example:**  
`[HttpGet] GetHotels()` returns all hotels.

---

### 18. How do you create a POST endpoint?
**Answer:**  
Use `[HttpPost]` attribute.  
**Stayora Example:**  
`[HttpPost] BookHotel()` lets travellers make bookings.

---

### 19. How do you handle exceptions globally?
**Answer:**  
With middleware or exception filters.  
**Stayora Example:**  
Returns proper error messages for API errors.

---

### 20. What is [FromBody] and [FromQuery]?
**Answer:**  
They specify where data comes from in the request.  
**Stayora Example:**  
`[FromBody] BookingDto` gets booking info from request body.

---

### 21. How do you return HTTP status codes?
**Answer:**  
With helper methods like `Ok()`, `NotFound()`, `BadRequest()`.  
**Stayora Example:**  
Returns `NotFound()` if a hotel is missing.

---

### 22. What is the difference between Ok() and Created()?
**Answer:**  
`Ok()` returns 200, `Created()` returns 201 with new resource location.  
**Stayora Example:**  
`Created()` is used after a new booking.

---

### 23. What is asynchronous programming in Web API?
**Answer:**  
Using `async` and `await` for non-blocking operations.  
**Stayora Example:**  
Database calls in Stayora use async.

---

### 24. How do you update a resource (PUT/PATCH)?
**Answer:**  
Use `[HttpPut]` or `[HttpPatch]` methods.  
**Stayora Example:**  
Admin can update hotel info.

---

### 25. What is REST?
**Answer:**  
A style for designing networked applications using HTTP methods.

---

### 26. What is RESTful API?
**Answer:**  
An API that follows REST principles (stateless, uses HTTP verbs).

---

### 27. What is statelessness in REST?
**Answer:**  
The server does not store client state; all data comes with each request.

---

### 28. How do you paginate results?
**Answer:**  
By accepting `page` and `pageSize` parameters and using `Skip()` and `Take()`.  
**Stayora Example:**  
Shows 10 hotels per page.

---

### 29. How do you filter results?
**Answer:**  
By adding query parameters.  
**Stayora Example:**  
Filter hotels by city or price.

---

### 30. What is [Authorize] attribute?
**Answer:**  
Requires the user to be authenticated.  
**Stayora Example:**  
Only logged-in users can book or pay.

---

### 31. How do you implement role-based authorization?
**Answer:**  
Use `[Authorize(Roles = "Admin")]` etc.  
**Stayora Example:**  
Only Admins can delete hotels.

---

### 32. How do you log activity in Web API?
**Answer:**  
Using built-in logging or third-party libraries.

---

### 33. How do you test Web API endpoints?
**Answer:**  
With tools like Postman, Swagger, or integration tests.

---

### 34. What is IHttpActionResult?
**Answer:**  
A return type that wraps an HTTP response.

---

### 35. How do you version APIs?
**Answer:**  
By using versioned routes like `/api/v1/hotels`.

---

### 36. How do you upload files via Web API?
**Answer:**  
Accept `IFormFile` in your controller method.

---

### 37. How do you download files?
**Answer:**  
Return `File()` with the correct content type.

---

### 38. What is model binding?
**Answer:**  
Maps request data to action parameters.

---

### 39. How does Web API handle cross-origin requests?
**Answer:**  
With CORS policies.

---

### 40. How do you return custom error messages?
**Answer:**  
Return `BadRequest(new { error = "message" })`.

---

### 41. What is the difference between HTTP GET and POST?
**Answer:**  
GET retrieves data, POST submits data to create a resource.

---

### 42. How do you use query strings in Web API?
**Answer:**  
Add parameters to GET methods.

---

### 43. What is a service in Web API?
**Answer:**  
A class that holds business logic, injected into controllers.

---

### 44. What is the Repository pattern?
**Answer:**  
A layer between the data access and business logic.

---

### 45. What is a Unit of Work?
**Answer:**  
A class managing multiple repositories for a single transaction.

---

### 46. How do you seed data in EF Core?
**Answer:**  
In `OnModelCreating` or via migrations.

---

### 47. How do you handle database migrations?
**Answer:**  
With `Add-Migration` and `Update-Database` commands.

---

### 48. How do you protect sensitive data?
**Answer:**  
Never expose passwords; use DTOs and hash passwords.

---

### 49. What is a singleton service?
**Answer:**  
A service with one instance for the app’s lifetime.

---

### 50. What is scoped and transient service?
**Answer:**  
Scoped: one per request. Transient: new every time requested.

---

### 51. What is IHttpContextAccessor?
**Answer:**  
A way to access HTTP context outside controllers.

---

### 52. How do you implement logging in API?
**Answer:**  
Use ILogger in controllers/services.

---

### 53. What is a filter in Web API?
**Answer:**  
Code that runs before/after actions (like auth or logging).

---

### 54. How do you handle concurrency in EF Core?
**Answer:**  
With concurrency tokens like rowversion.

---

### 55. How do you handle rate limiting?
**Answer:**  
With middleware or third-party libraries.

---

### 56. What is the difference between API and MVC controllers?
**Answer:**  
API returns data (JSON), MVC returns views (HTML).

---

### 57. How do you set up HTTPS in Web API?
**Answer:**  
Configure in app settings and launch profiles.

---

### 58. What is the significance of `app.UseEndpoints`?
**Answer:**  
Defines which endpoints are available.

---

### 59. How do you document APIs?
**Answer:**  
With Swagger and XML comments.

---

### 60. What is API throttling?
**Answer:**  
Limiting number of requests from a client.

---

### 61. What is the use of [ApiController]?
**Answer:**  
Enables automatic model validation, better error messages.

---

### 62. What are global exception filters?
**Answer:**  
Filters applied to all actions for consistent error handling.

---

### 63. How do you use configuration in Web API?
**Answer:**  
Inject `IConfiguration` and read values from `appsettings.json`.

---

### 64. What is `appsettings.json`?
**Answer:**  
A JSON file for storing configuration like connection strings.

---

### 65. What is JWT?
**Answer:**  
A JSON Web Token for secure user authentication.

---

### 66. How do you generate JWT in Web API?
**Answer:**  
Use a token service and return token after login.

---

### 67. What is a custom middleware?
**Answer:**  
A developer-written component for the HTTP pipeline.

---

### 68. How do you use async/await in controllers?
**Answer:**  
Mark actions as async and return Task.

---

### 69. How do you handle file downloads?
**Answer:**  
Return a FileResult with byte data.

---

### 70. What is a cancellation token?
**Answer:**  
Used to cancel async operations.

---

### 71. How do you cache data in Web API?
**Answer:**  
With in-memory cache or distributed cache.

---

### 72. How do you invalidate cache?
**Answer:**  
Remove or update cached data when underlying data changes.

---

### 73. What is token expiration?
**Answer:**  
JWT tokens expire after a set time for security.

---

### 74. How do you refresh tokens?
**Answer:**  
Implement refresh token logic to issue new tokens.

---

### 75. How do you protect against CSRF in API?
**Answer:**  
APIs are usually stateless; CSRF is less relevant but can use anti-forgery tokens if needed.

---

### 76. How do you protect against XSS in API?
**Answer:**  
Validate and sanitize input.

---

### 77. How do you ensure only certain roles can access an endpoint?
**Answer:**  
Use `[Authorize(Roles="RoleName")]`.

---

### 78. How do you implement search endpoints?
**Answer:**  
Add GET endpoints accepting filter parameters.

---

### 79. What is health check endpoint?
**Answer:**  
An endpoint to check if API is running (e.g., `/api/health`).

---

### 80. How do you handle large file uploads?
**Answer:**  
Configure request size limits and process file streams.

---

### 81. How do you send email from Web API?
**Answer:**  
Inject a mail service and call it in controller.

---

### 82. How do you generate PDF from API?
**Answer:**  
Use a library like iTextSharp or DinkToPdf.

---

### 83. How do you export data as CSV or Excel?
**Answer:**  
Return file with CSV or Excel content type.

---

### 84. How do you handle soft deletes?
**Answer:**  
Add an `IsDeleted` flag and filter out deleted records.

---

### 85. How do you implement auditing?
**Answer:**  
Track changes in an audit log table.

---

### 86. What is the difference between synchronous and asynchronous API?
**Answer:**  
Async APIs free up resources for other requests.

---

### 87. How do you test API error handling?
**Answer:**  
Send invalid data and check error response.

---

### 88. What is a 404 Not Found?
**Answer:**  
Returned when the resource does not exist.

---

### 89. What is a 401 Unauthorized?
**Answer:**  
Returned when authentication fails.

---

### 90. What is a 403 Forbidden?
**Answer:**  
Returned when user is authenticated but not allowed.

---

### 91. How do you restrict API to HTTPS only?
**Answer:**  
Set up HTTPS redirection middleware.

---

### 92. What is HATEOAS?
**Answer:**  
Hypermedia as the Engine of Application State (API gives links to related actions).

---

### 93. How do you use app.UseRouting()?
**Answer:**  
Sets up route matching for endpoints.

---

### 94. What is a 500 Internal Server Error?
**Answer:**  
Returned when the server encounters an unexpected condition.

---

### 95. How do you version database models?
**Answer:**  
Use EF Core migrations.

---

### 96. How do you handle circular references in JSON?
**Answer:**  
Configure JSON serializer to ignore or handle loops.

---

### 97. What is a custom exception?
**Answer:**  
A user-defined class for specific error cases.

---

### 98. How do you mock dependencies for testing?
**Answer:**  
Use Moq or similar libraries to create test doubles.

---

### 99. How do you run background tasks in API?
**Answer:**  
Use hosted services like `IHostedService`.

---

### 100. How does your project (Stayora) use Web API?
**Answer:**  
Stayora uses Web API for all backend business logic:  
- Travellers use API to search, book, and pay for hotels/flights/packages.  
- Admins use API to manage hotels, flights, and users.  
- Hotel managers and travel agents use API to update hotels and itineraries.  
- All authentication, support tickets, payments, and reviews are handled through API endpoints.

---
