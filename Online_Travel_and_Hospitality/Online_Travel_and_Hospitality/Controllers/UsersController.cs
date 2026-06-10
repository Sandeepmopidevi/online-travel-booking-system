using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Online_Travel_and_Hospitality.Interfaces;
using Online_Travel_and_Hospitality.Models.DTO;

namespace Online_Travel_and_Hospitality.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost]
        [Route("CreateUsers")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateUsers(UserDTO userDTO)
        {
            try
            {
                var user = await _userService.CreateUserAsync(userDTO);
                return Ok(user);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { errors = ex.Message });
            }
        }

        [HttpGet]
        [Route("GetUsers")]
        [Authorize(Roles = "Admin, Hotel Manager, Travel Agent")]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _userService.GetUsersAsync();
            return Ok(users);
        }

        [HttpGet]
        [Route("GetUserById/{id}")]
        [Authorize(Roles = "Admin, Traveller")]
        public async Task<IActionResult> GetUserById(int id)
        {
            var user = await _userService.GetUserByIdAsync(id);
            if (user == null)
                return NotFound(new { message = "User not found." });
            return Ok(user);
        }

        [HttpGet]
        [Route("GetUserIdByEmail")]
        [Authorize(Roles = "Admin, Traveller, Hotel Manager, Travel Agent")]
        public async Task<IActionResult> GetUserIdByEmail([FromQuery] string email)
        {
            if (string.IsNullOrWhiteSpace(email))
                return BadRequest(new { message = "Email is required." });

            var userId = await _userService.GetUserIdByEmailAsync(email);
            if (userId == null)
                return NotFound(new { message = "User not found." });

            return Ok(new { userId });
        }

        [HttpGet]
        [Route("GetUser/{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _userService.GetUserByIdAsync(id);
            if (user == null)
                return NotFound(new { message = "Booking not found" });
            return Ok(user);
        }

        [HttpPut]
        [Route("UpdateUsers/{id}")]
        [Authorize(Roles = "Admin,Traveller")]
        public async Task<IActionResult> UpdateUsers(int id, UserDTO userDTO)
        {
            try
            {
                var user = await _userService.UpdateUserAsync(id, userDTO);
                if (user == null)
                    return NotFound(new { message = "User not found." });
                return Ok(user);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { errors = ex.Message });
            }
        }

        [HttpPost]
        [Route("UpdateUserProfile")]
        [Authorize]
        public async Task<IActionResult> UpdateUserDetails([FromBody] UpdateUserNameContactDto updateUser)
        {
            var email = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;
            if (string.IsNullOrEmpty(email))
                return Unauthorized("Email claim is missing.");

            var userDto = await _userService.UpdateUserProfileAsync(email, updateUser);
            return Ok(userDto);
        }

        [HttpDelete]
        [Route("DeleteUsers/{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteUsers(int id)
        {
            var result = await _userService.DeleteUserAsync(id);
            if (!result)
                return NotFound(new { message = "User not found." });
            return Ok(new { message = "User deleted successfully." });
        }
    }
}