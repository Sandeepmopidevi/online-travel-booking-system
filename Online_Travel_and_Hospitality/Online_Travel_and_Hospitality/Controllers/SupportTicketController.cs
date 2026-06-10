using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Online_Travel_and_Hospitality.Interfaces;
using Online_Travel_and_Hospitality.Models.DTO;

namespace Online_Travel_and_Hospitality.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SupportTicketController : ControllerBase
    {
        private readonly ISupportTicketService _supportTicketService;

        public SupportTicketController(ISupportTicketService supportTicketService)
        {
            _supportTicketService = supportTicketService;
        }

        [HttpPost]
        [Route("CreateSupportTicket")]
        [Authorize(Roles = "Traveller, Admin")]
        public async Task<IActionResult> CreateSupportTicket(SupportTicketDTO supportticket)
        {
            try
            {
                var created = await _supportTicketService.CreateSupportTicketAsync(supportticket);
                return Ok(created);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("GetSupportTickets")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetSupportTickets()
        {
            var tickets = await _supportTicketService.GetSupportTicketsAsync();
            return Ok(tickets);
        }

        [HttpGet]
        [Route("GetSupportTicket/{id}")]
        [Authorize(Roles = "Admin,Traveller")]
        public async Task<IActionResult> GetSupportTicket(int id)
        {
            var ticket = await _supportTicketService.GetSupportTicketByIdAsync(id);
            if (ticket == null)
                return NotFound(new { message = "Support ticket not found" });
            return Ok(ticket);
        }

        [HttpPut]
        [Route("UpdateSupportTicket/{id}")]
        [Authorize(Roles = "Admin,Traveller")]
        public async Task<IActionResult> UpdateSupportTicket(int id, SupportTicketDTO supportTicketDTO)
        {
            var updated = await _supportTicketService.UpdateSupportTicketAsync(id, supportTicketDTO);
            if (updated == null)
                return NotFound(new { message = "Support ticket not found" });
            return Ok(updated);
        }

        [HttpDelete]
        [Route("DeleteSupportTicket/{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteSupportTicket(int id)
        {
            var result = await _supportTicketService.DeleteSupportTicketAsync(id);
            if (!result)
                return NotFound(new { message = "Support ticket not found" });
            return Ok(new { message = "Support ticket deleted successfully" });
        }
    }
}