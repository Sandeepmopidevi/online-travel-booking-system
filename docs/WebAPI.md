# Top 50 C# Web API Interview Questions with Answers

## 1. **What is a Web API?**

A Web API is a framework for building HTTP services that can be consumed by various clients including browsers, mobile devices, and desktop applications.

## 2. **What are the main return types in Web API?**

* HttpResponseMessage
* IHttpActionResult
* IActionResult (ASP.NET Core)
* Specific type (like string, int, object)

## 3. **What is REST?**

REST (Representational State Transfer) is an architectural style for designing networked applications using stateless, client-server communication.

## 4. **Explain the HTTP verbs used in Web API.**

* GET – Retrieve data
* POST – Create data
* PUT – Update data
* DELETE – Delete data

## 5. **What is the difference between PUT and PATCH?**

* PUT updates the entire resource.
* PATCH updates a partial resource.

## 6. **How do you handle exceptions in Web API?**

* Using try-catch blocks
* Global exception handling via middleware or filters (ExceptionFilterAttribute)

## 7. **What is routing in Web API?**

Routing is the mechanism that dispatches an HTTP request to a matching action method.

## 8. **What are attribute routing and convention-based routing?**

* Attribute routing uses attributes to define routes.
* Convention-based routing uses route templates defined in `Startup.cs` or `WebApiConfig.cs`.

## 9. **What is dependency injection in Web API?**

Dependency injection allows you to inject dependencies into controllers rather than creating them manually.

## 10. **How do you secure a Web API?**

* JWT tokens
* OAuth
* API keys
* Role-based authorization

## 11. **What is CORS and why is it needed?**

CORS (Cross-Origin Resource Sharing) allows access to a resource from a different origin/domain.

## 12. **How to enable CORS in Web API?**

* In ASP.NET Core: `services.AddCors()`
* Middleware: `app.UseCors()`

## 13. **What is middleware in ASP.NET Core?**

Middleware is software that's assembled into an application pipeline to handle requests and responses.

## 14. **What is the difference between IActionResult and ActionResult<T>?**

* `IActionResult` allows more flexibility
* `ActionResult<T>` combines the return type and status code

## 15. **What is model binding?**

Model binding maps data from HTTP requests to action method parameters.

## 16. **What is model validation?**

Model validation checks the validity of data using data annotations like \[Required], \[StringLength], etc.

## 17. **How to return custom status codes in Web API?**

Use `return StatusCode(400, "Bad Request")` or `return NotFound()`, etc.

## 18. **What are filters in Web API?**

Filters are attributes that can run code before or after specific pipeline stages (e.g., `AuthorizationFilter`, `ActionFilter`).

## 19. **What is an ActionFilter?**

It lets you run logic before and after an action executes.

## 20. **What is the difference between Web API and MVC?**

Web API is used for building RESTful services, MVC is used for web applications with views.

## 21. **What is HttpContext?**

HttpContext provides access to all HTTP-specific information about an individual HTTP request.

## 22. **How to implement versioning in Web API?**

* URI versioning: `/api/v1/products`
* Header versioning
* Query string versioning

## 23. **How to create custom middleware?**

Create a class with `Invoke(HttpContext context)` and register in pipeline using `app.UseMiddleware<>()`

## 24. **What is JWT?**

JSON Web Token is an open standard for securely transmitting information as a JSON object.

## 25. **How to validate JWT token in Web API?**

* Configure JWT authentication in `Startup.cs`
* Validate with `UseAuthentication()` middleware

## 26. **What is Swagger?**

Swagger is a tool for documenting APIs. It provides a UI to test endpoints.

## 27. **How to add Swagger in Web API?**

Install Swashbuckle NuGet package and configure in `Startup.cs`.

## 28. **What is DTO?**

Data Transfer Object is a plain object used to transfer data between layers.

## 29. **What is AutoMapper?**

A library used to map one object to another (DTO to Domain Model).

## 30. **What is asynchronous programming in Web API?**

Use async/await to handle non-blocking I/O-bound operations.

## 31. **How to return JSON in Web API?**

Web API returns JSON by default. Use `return Ok(object)`.

## 32. **What is the difference between Ok() and Ok<T>()?**

* `Ok()` returns 200 status code.
* `Ok<T>()` returns 200 with specific data type.

## 33. **How to log in Web API?**

Use built-in logging (`ILogger`) or third-party tools like Serilog, NLog.

## 34. **What are HTTP status codes commonly used in Web API?**

* 200 OK
* 201 Created
* 400 Bad Request
* 401 Unauthorized
* 404 Not Found
* 500 Internal Server Error

## 35. **How to return 404 if data not found?**

`if (data == null) return NotFound();`

## 36. **How to handle file upload in Web API?**

Use `IFormFile` in method parameters and read file content from the stream.

## 37. **How to implement custom authentication?**

Create a custom `AuthenticationHandler` or use middleware with token validation logic.

## 38. **How do you use configuration in Web API?**

Use `IConfiguration` to read from `appsettings.json`.

## 39. **What is the use of \[ApiController] attribute?**

It enables automatic model validation and parameter binding features.

## 40. **What is dependency injection lifecycle?**

* Singleton
* Scoped
* Transient

## 41. **What is IHttpClientFactory?**

A factory for creating `HttpClient` instances with better memory management.

## 42. **How to call another API from Web API?**

Use `HttpClient` with dependency injection or `IHttpClientFactory`.

## 43. **What are middleware types in ASP.NET Core?**

* Built-in (Routing, CORS, Auth)
* Custom (user-defined logic)

## 44. **How to restrict access to endpoints in Web API?**

Use `[Authorize]`, `[AllowAnonymous]`, or role-based authorization.

## 45. **How to implement global exception handling?**

Use `UseExceptionHandler()` middleware in `Startup.cs`.

## 46. **What is the difference between synchronous and asynchronous controller actions?**

Async actions improve scalability by freeing up threads during I/O operations.

## 47. **How to consume Web API in .NET?**

Use `HttpClient` to send HTTP requests and read responses.

## 48. **What is the difference between controller and controller base?**

* `Controller` supports views
* `ControllerBase` is for APIs (no view support)

## 49. **What are the common tools for testing Web API?**

* Postman
* Swagger
* Curl

## 50. **How to unit test a Web API controller?**

* Use xUnit/NUnit
* Mock dependencies
* Use In-Memory DB for EF Core

---