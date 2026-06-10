# AuthService and AuthController: Line-by-Line Simple Explanation

This explanation will walk through the AuthService, AuthController, and IAuthService code, word by word and line by line, using simple beginner-friendly language and project context.

---

## 1. AuthService Class

### Namespaces and Usings

```csharp
using Microsoft.AspNetCore.Identity;
using Online_Travel_and_Hospitality.Data;
using Online_Travel_and_Hospitality.DTO;
using Online_Travel_and_Hospitality.Interfaces;
using Online_Travel_and_Hospitality.Models.Domain;
using Online_Travel_and_Hospitality.Models.DTO;
```
- `using ...;` lines: These bring in other code libraries/functions so you can use their features without writing the full path every time.
- These include tools for user authentication (`Identity`), your database connections, data transfer objects (DTOs), interfaces, and user domain models.

---

### Class and Constructor

```csharp
namespace Online_Travel_and_Hospitality.Services
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<IdentityUser> userManager;
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly AuthDbContext authDbContext;
        private readonly ApplicationDbContext dataDbContext;
        private readonly ITokenRepository tokenRepository;
```
- `namespace ...`: Groups this code under a project area (like a folder).
- `public class AuthService : IAuthService`: This is a class called AuthService. It promises to follow the rules of `IAuthService` (an interface).
- `private readonly ...`: These lines declare private variables that this class will store to talk to user accounts, roles, and databases.
  - `UserManager` and `RoleManager`: Helpers from ASP.NET Core Identity to create/find users and manage roles.
  - `AuthDbContext` and `ApplicationDbContext`: Your database access classes (one for authentication, one for main app data).
  - `ITokenRepository`: Helper to create JWT tokens.

```csharp
        public AuthService(
            UserManager<IdentityUser> userManager,
            RoleManager<IdentityRole> roleManager,
            AuthDbContext authDbContext,
            ApplicationDbContext dataDbContext,
            ITokenRepository tokenRepository)
        {
            this.userManager = userManager;
            this.roleManager = roleManager;
            this.authDbContext = authDbContext;
            this.dataDbContext = dataDbContext;
            this.tokenRepository = tokenRepository;
        }
```
- `public AuthService(...params...)`: This is a constructor. It gets called when you create an AuthService object.
- It takes in all the helpers above and saves them in the class (`this.xxx = xxx`) so they can be used by other methods.

---

### RegisterAsync Method

```csharp
        public async Task<(bool Success, IEnumerable<string> Errors)> RegisterAsync(RegisterRequestDto request)
        {
            var validRoles = new[] { "Admin", "Traveller", "Hotel Manager", "Travel Agent" };
            if (!validRoles.Contains(request.Role))
            {
                return (false, new[] { "Invalid role selected." });
            }
```
- `public async Task<...> RegisterAsync(...)`: This is an asynchronous method (doesn't block the app) for registering a new user.
- `RegisterRequestDto request`: Input info from the frontend (like name, email, password, role, etc.).
- `var validRoles = ...`: Defines which roles are allowed.
- If the role is not allowed, return an error.

```csharp
            var existingUser = await userManager.FindByEmailAsync(request.Email);
            if (existingUser != null)
            {
                return (false, new[] { "A user with this email already exists." });
            }
```
- Checks if a user already exists with this email.
- If yes, returns an error.

```csharp
            var identityUser = new IdentityUser
            {
                UserName = request.Email,
                Email = request.Email
            };
```
- Creates a new `IdentityUser` using the email as both username and email.

```csharp
            var createUserResult = await userManager.CreateAsync(identityUser, request.Password);
            if (!createUserResult.Succeeded)
            {
                return (false, createUserResult.Errors.Select(e => e.Description));
            }
```
- Tries to create the user in the authentication system.
- If it fails, returns the list of errors.

```csharp
            // Ensure the role exists
            if (!await roleManager.RoleExistsAsync(request.Role))
            {
                var roleResult = await roleManager.CreateAsync(new IdentityRole(request.Role));
                if (!roleResult.Succeeded)
                {
                    return (false, roleResult.Errors.Select(e => e.Description));
                }
            }
```
- Checks if the role (Admin, Traveller, etc.) exists.
- If not, creates the role.
- If role creation fails, returns errors.

```csharp
            var roleAssignResult = await userManager.AddToRoleAsync(identityUser, request.Role);
            if (!roleAssignResult.Succeeded)
            {
                return (false, roleAssignResult.Errors.Select(e => e.Description));
            }
```
- Assigns the user to the selected role.
- If that fails, returns errors.

```csharp
            // Add to custom Users table
            var user = new User
            {
                Name = request.Name,
                Email = request.Email,
                Password = "Password Not Stored", // Hash will be implemented in further sprint
                Role = request.Role,
                ContactNumber = request.ContactNumber
            };

            dataDbContext.Users.Add(user);
            await dataDbContext.SaveChangesAsync();
```
- Also creates a record in your custom Users table (for storing extra info).
- Adds the user and saves changes to your main database.

```csharp
            return (true, null);
        }
```
- Everything worked, so returns success.

---

### LoginAsync Method

```csharp
        public async Task<(bool Success, LoginResponseDto Response, string Error)> LoginAsync(LoginRequestDto request)
        {
            if (string.IsNullOrWhiteSpace(request.Email) || string.IsNullOrWhiteSpace(request.Password))
            {
                return (false, null, "Email and Password are required.");
            }
```
- Checks if email and password are provided.
- If not, returns error.

```csharp
            var identityUser = await userManager.FindByEmailAsync(request.Email);
            if (identityUser == null)
            {
                return (false, null, "Invalid email or password.");
            }
```
- Tries to find the user by email. If not found, returns error.

```csharp
            var checkPasswordResult = await userManager.CheckPasswordAsync(identityUser, request.Password);
            if (!checkPasswordResult)
            {
                return (false, null, "Invalid email or password.");
            }
```
- Checks if the password matches for this user.
- If not, returns error.

```csharp
            var roles = await userManager.GetRolesAsync(identityUser);

            var jwtToken = tokenRepository.CreateJwtToken(identityUser, roles.ToList());

            var response = new LoginResponseDto
            {
                Email = request.Email,
                Roles = roles.ToList(),
                Token = jwtToken
            };

            return (true, response, null);
        }
    }
}
```
- Gets the user's roles.
- Creates a JWT token (for authentication).
- Prepares a response with email, roles, and the token.
- Returns success, response, and no error.

---

## 2. AuthController Class

```csharp
using Microsoft.AspNetCore.Mvc;
using Online_Travel_and_Hospitality.DTO;
using Online_Travel_and_Hospitality.Models.DTO;
using Online_Travel_and_Hospitality.Interfaces;
using System.Linq;
using System.Threading.Tasks;
using Online_Travel_and_Hospitality.Services;
```
- Brings in necessary libraries for controllers, DTOs, interfaces, services, and tasks.

```csharp
namespace Online_Travel_and_Hospitality.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService authService;

        public AuthController(IAuthService authService)
        {
            this.authService = authService;
        }
```
- `namespace ...`: Groups controllers.
- `[Route("api/[controller]")]`: Sets the base API route (e.g., `/api/auth`).
- `[ApiController]`: Marks it as a Web API controller.
- `public class AuthController`: Controller for authentication actions (register/login).
- `private readonly IAuthService authService;`: Stores the authentication service.
- `public AuthController(...)`: Gets the service through dependency injection.

---

### Register Endpoint

```csharp
        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequestDto request)
        {
            var (success, errors) = await authService.RegisterAsync(request);
            if (!success)
            {
                return BadRequest(new { errors });
            }
            return Ok(new { message = "User registered successfully and synchronized with Users table." });
        }
```
- `[HttpPost] [Route("register")]`: POST method at `/api/auth/register`.
- `Register([FromBody] RegisterRequestDto request)`: Gets registration data from the request body.
- Calls `RegisterAsync` on the service.
- If not successful, returns 400 Bad Request with errors.
- If successful, returns 200 OK with a message.

---

### Login Endpoint

```csharp
        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestDto request)
        {
            var (success, response, error) = await authService.LoginAsync(request);
            if (!success)
            {
                if (error == "Email and Password are required.")
                    return BadRequest(new { message = error });
                return Unauthorized(new { message = error });
            }
            return Ok(response);
        }
    }
}
```
- `[HttpPost] [Route("login")]`: POST method at `/api/auth/login`.
- `Login([FromBody] LoginRequestDto request)`: Gets login data from the request body.
- Calls `LoginAsync` on the service.
- If not successful:  
  - If missing email/password, returns 400 Bad Request.
  - Otherwise, returns 401 Unauthorized.
- If successful, returns the login response (with JWT token).

---

## 3. IAuthService Interface

```csharp
using Online_Travel_and_Hospitality.DTO;
using Online_Travel_and_Hospitality.Models.DTO;

namespace Online_Travel_and_Hospitality.Interfaces
{
    public interface IAuthService
    {
        Task<(bool Success, IEnumerable<string> Errors)> RegisterAsync(RegisterRequestDto request);
        Task<(bool Success, LoginResponseDto Response, string Error)> LoginAsync(LoginRequestDto request);
    }
}
```
- Defines what methods the AuthService must implement.
  - `RegisterAsync`: Registers a user.
  - `LoginAsync`: Logs in a user.

---

# Summary

- **AuthService**: Handles user registration and login logic using Identity and database.
- **AuthController**: Provides API endpoints for frontend to call for register and login.
- **IAuthService**: Interface that defines what AuthService must provide.

All logic is split cleanly:  
Controller handles HTTP, Service handles business logic, Interface defines the contract.

---