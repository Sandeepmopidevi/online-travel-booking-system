using Microsoft.EntityFrameworkCore;
using Online_Travel_and_Hospitality.Data;
using Online_Travel_and_Hospitality.Models.Domain;
using Online_Travel_and_Hospitality.Models.DTO;
using Online_Travel_and_Hospitality.Interfaces;

namespace Online_Travel_and_Hospitality.Services
{
    public class InvoiceService : IInvoiceService
    {
        private readonly ApplicationDbContext _context;

        public InvoiceService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Invoice> CreateInvoiceAsync(InvoiceDTO invoiceDTO)
        {
            var invoice = new Invoice
            {
                TotalAmount = invoiceDTO.TotalAmount,
                Timestamp = invoiceDTO.Timestamp,
                UserID = invoiceDTO.UserID,
                BookingId = invoiceDTO.BookingId
            };
            _context.Invoices.Add(invoice);
            await _context.SaveChangesAsync();
            return invoice;
        }

        public async Task<IEnumerable<Invoice>> GetInvoicesAsync()
        {
            return await _context.Invoices.ToListAsync();
        }

        public async Task<Invoice?> GetInvoiceByIdAsync(int id)
        {
            return await _context.Invoices.FindAsync(id);
        }

        public async Task<Invoice?> UpdateInvoiceAsync(int id, InvoiceDTO invoiceDTO)
        {
            var invoice = await _context.Invoices.FindAsync(id);
            if (invoice == null)
                return null;

            invoice.TotalAmount = invoiceDTO.TotalAmount;
            invoice.Timestamp = invoiceDTO.Timestamp;
            invoice.UserID = invoiceDTO.UserID;
            invoice.BookingId = invoiceDTO.BookingId;

            _context.Entry(invoice).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return invoice;
        }

        public async Task<bool> DeleteInvoiceAsync(int id)
        {
            var invoice = await _context.Invoices.FindAsync(id);
            if (invoice == null)
                return false;

            _context.Invoices.Remove(invoice);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task GenerateInvoiceAsync(int bookingId, int userId, decimal amount)
        {
            var invoice = await _context.Invoices.FirstOrDefaultAsync(i => i.BookingId == bookingId);
            if (invoice == null)
            {
                var invoiceObjectForDB = new Invoice
                {
                    TotalAmount = (int)amount,
                    Timestamp = DateTimeOffset.Now,
                    UserID = userId,
                    BookingId = bookingId
                };
                _context.Invoices.Add(invoiceObjectForDB);
            }
            else
            {
                invoice.TotalAmount = (int)amount;
                invoice.Timestamp = DateTimeOffset.Now;
                _context.Entry(invoice).State = EntityState.Modified;
            }
            await _context.SaveChangesAsync();
        }
    }
}