using Microsoft.EntityFrameworkCore;
using Online_Travel_and_Hospitality.Data;
using Online_Travel_and_Hospitality.Interfaces;
using Online_Travel_and_Hospitality.Models.Domain;
using Online_Travel_and_Hospitality.Models.DTO;

namespace Online_Travel_and_Hospitality.Services
{
    public class PaymentService : IPaymentService
    {
        private readonly ApplicationDbContext _context;
        private readonly IInvoiceService _invoiceService;

        public PaymentService(ApplicationDbContext context, IInvoiceService invoiceService)
        {
            _context = context;
            _invoiceService = invoiceService;
        }

        public async Task<Payment> CreatePaymentAsync(PaymentDTO paymentDTO)
        {
            var tempUser = await _context.Users.FirstOrDefaultAsync(r => r.UserId == paymentDTO.UserId);
            if (tempUser == null)
                throw new ArgumentException("User does not exist");

            var payment = new Payment
            {
                BookingId = paymentDTO.BookingId,
                UserId = paymentDTO.UserId,
                Amount = paymentDTO.Amount,
                Status = paymentDTO.Status,
                PaymentMethod = paymentDTO.PaymentMethod
            };

            _context.Payments.Add(payment);
            await _context.SaveChangesAsync();

            // Update the booking with the payment ID
            var booking = await _context.Bookings.FindAsync(paymentDTO.BookingId);
            if (booking != null)
            {
                booking.PaymentID = payment.PaymentId;
                _context.Entry(booking).State = EntityState.Modified;
                await _context.SaveChangesAsync();
            }

            // Generate or update the invoice
            await _invoiceService.GenerateInvoiceAsync(payment.BookingId, payment.UserId, payment.Amount);

            return payment;
        }

        public async Task<IEnumerable<Payment>> GetPaymentsAsync()
        {
            return await _context.Payments.ToListAsync();
        }

        public async Task<Payment?> GetPaymentByIdAsync(int id)
        {
            return await _context.Payments.FindAsync(id);
        }

        public async Task<Payment?> UpdatePaymentAsync(int id, PaymentDTO paymentDTO)
        {
            var payment = await _context.Payments.FindAsync(id);
            if (payment == null)
                return null;

            payment.BookingId = paymentDTO.BookingId;
            payment.UserId = paymentDTO.UserId;
            payment.Amount = paymentDTO.Amount;
            payment.Status = paymentDTO.Status;
            payment.PaymentMethod = paymentDTO.PaymentMethod;

            _context.Entry(payment).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return await _context.Payments.FindAsync(id);
        }

        public async Task<bool> DeletePaymentAsync(int id)
        {
            var payment = await _context.Payments.FindAsync(id);
            if (payment == null)
                return false;

            _context.Payments.Remove(payment);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}