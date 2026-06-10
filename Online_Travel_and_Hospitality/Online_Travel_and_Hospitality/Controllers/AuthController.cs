using Microsoft.AspNetCore.Mvc;
using Online_Travel_and_Hospitality.DTO;
using Online_Travel_and_Hospitality.Models.DTO;
using Online_Travel_and_Hospitality.Interfaces;

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