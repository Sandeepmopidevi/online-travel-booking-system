using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Online_Travel_and_Hospitality.Interfaces;
using Online_Travel_and_Hospitality.Models.Domain;
using Online_Travel_and_Hospitality.Models.DTO;

namespace Online_Travel_and_Hospitality.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InvoiceController : ControllerBase
    {
        private readonly IInvoiceService _invoiceService;

        public InvoiceController(IInvoiceService invoiceService)
        {
            _invoiceService = invoiceService;
        }

        [HttpPost("CreateInvoices")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<Invoice>> CreateInvoices([FromBody] InvoiceDTO invoice)
        {
            var createdInvoice = await _invoiceService.CreateInvoiceAsync(invoice);
            return Ok(createdInvoice);
        }

        [HttpGet("GetInvoices")]
        [Authorize(Roles = "Admin,Traveller")]
        public async Task<ActionResult<IEnumerable<Invoice>>> GetInvoices()
        {
            var invoices = await _invoiceService.GetInvoicesAsync();
            return Ok(invoices);
        }

        [HttpGet("GetInvoice/{id}")]
        [Authorize(Roles = "Admin,Traveller")]
        public async Task<ActionResult<Invoice>> GetInvoice(int id)
        {
            var invoice = await _invoiceService.GetInvoiceByIdAsync(id);
            if (invoice == null)
                return NotFound(new { message = "Invoice not found" });
            return Ok(invoice);
        }

        [HttpPut("UpdateInvoice/{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<Invoice>> UpdateInvoice(int id, [FromBody] InvoiceDTO invoiceDTO)
        {
            var updatedInvoice = await _invoiceService.UpdateInvoiceAsync(id, invoiceDTO);
            if (updatedInvoice == null)
                return NotFound(new { message = "Invoice not found" });
            return Ok(updatedInvoice);
        }

        [HttpDelete("DeleteInvoice/{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> DeleteInvoice(int id)
        {
            var result = await _invoiceService.DeleteInvoiceAsync(id);
            if (!result)
                return NotFound(new { message = "Invoice not found" });
            return Ok(new { message = "Invoice deleted successfully" });
        }
    }
}