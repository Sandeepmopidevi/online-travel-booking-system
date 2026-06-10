using Online_Travel_and_Hospitality.Models.Domain;
using Online_Travel_and_Hospitality.Models.DTO;

namespace Online_Travel_and_Hospitality.Interfaces
{
    public interface IInvoiceService
    {
        Task<Invoice> CreateInvoiceAsync(InvoiceDTO invoiceDTO);
        Task<IEnumerable<Invoice>> GetInvoicesAsync();
        Task<Invoice?> GetInvoiceByIdAsync(int id);
        Task<Invoice?> UpdateInvoiceAsync(int id, InvoiceDTO invoiceDTO);
        Task<bool> DeleteInvoiceAsync(int id);
        Task GenerateInvoiceAsync(int bookingId, int userId, decimal amount);
    }
}