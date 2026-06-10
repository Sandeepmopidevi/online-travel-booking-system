using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Online_Travel_and_Hospitality.Models.Domain;

namespace Online_Travel_and_Hospitality.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContactUsController : ControllerBase
    {
        // Static list to store contact messages in memory
        private static List<ContactUs> contacts = new List<ContactUs>();

        // GET: api/ContactUs
        [HttpGet]
        [Authorize(Roles = "Admin,Traveller, Hotel Manager, Travel Agent")]
        public IActionResult GetContacts()
        {
            // Return the list of contact messages
            return Ok(contacts);
        }

        // POST: api/ContactUs
        [HttpPost]
        public IActionResult CreateContact([FromBody] ContactUs contact)
        {
            // Validate the input data
            if (contact == null || string.IsNullOrWhiteSpace(contact.Name) || string.IsNullOrWhiteSpace(contact.Email))
            {
                return BadRequest("Invalid contact data.");
            }

            // Add the contact message to the in-memory list
            contacts.Add(contact);

            // Return the created contact message with its location
            return CreatedAtAction(nameof(GetContacts), new { id = contacts.Count - 1 }, contact);
        }
    }
}