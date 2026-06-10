using Online_Travel_and_Hospitality.Services;
using Microsoft.AspNetCore.Mvc;
using Online_Travel_and_Hospitality.Models.Domain;
using Microsoft.AspNetCore.Authorization;

namespace Online_Travel_and_Hospitality.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmailController : ControllerBase
    {
        // Dependency for sending emails
        private readonly EmailService _emailService;

        public EmailController(EmailService emailService)
        {
            _emailService = emailService;
        }

        [HttpPost("send")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> SendEmail([FromBody] EmailRequest request)
        {
            // Validate the email request
            if (string.IsNullOrEmpty(request.To) || string.IsNullOrEmpty(request.Subject) || string.IsNullOrEmpty(request.Body))
            {
                return BadRequest("Invalid email request.");
            }

            // Use the EmailService to send the email
            await _emailService.SendEmailAsync(request.To, request.Subject, request.Body);

            // Return a success response
            return Ok("Email sent successfully!");
        }
    }
}