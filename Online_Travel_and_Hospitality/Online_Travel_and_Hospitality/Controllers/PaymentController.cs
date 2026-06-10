using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Online_Travel_and_Hospitality.Interfaces;
using Online_Travel_and_Hospitality.Models.DTO;

namespace Online_Travel_and_Hospitality.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private readonly IPaymentService _paymentService;

        public PaymentController(IPaymentService paymentService)
        {
            _paymentService = paymentService;
        }

        [HttpPost]
        [Route("CreatePayment")]
        [Authorize(Roles = "Admin,Traveller")]
        public async Task<IActionResult> CreatePayment(PaymentDTO payment)
        {
            try
            {
                var paymentObj = await _paymentService.CreatePaymentAsync(payment);
                return Ok(paymentObj);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("GetPayments")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetPayments()
        {
            var listOfPayments = await _paymentService.GetPaymentsAsync();
            return Ok(listOfPayments);
        }

        [HttpGet]
        [Route("GetPayment/{id}")]
        [Authorize(Roles = "Admin,Traveller")]
        public async Task<IActionResult> GetPayment(int id)
        {
            var payment = await _paymentService.GetPaymentByIdAsync(id);
            if (payment == null)
                return NotFound(new { message = "Payment not found" });
            return Ok(payment);
        }

        [HttpPut]
        [Route("UpdatePayment/{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdatePayment(int id, PaymentDTO paymentDTO)
        {
            var updatedPayment = await _paymentService.UpdatePaymentAsync(id, paymentDTO);
            if (updatedPayment == null)
                return NotFound(new { message = "Payment not found" });
            return Ok(updatedPayment);
        }

        [HttpDelete]
        [Route("DeletePayment/{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeletePayment(int id)
        {
            var result = await _paymentService.DeletePaymentAsync(id);
            if (!result)
                return NotFound(new { message = "Payment not found" });
            return Ok(new { message = "Payment deleted successfully" });
        }
    }
}