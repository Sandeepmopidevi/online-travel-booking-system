using Online_Travel_and_Hospitality.Models.Domain;
using Online_Travel_and_Hospitality.Models.DTO;

namespace Online_Travel_and_Hospitality.Interfaces
{
    public interface IPaymentService
    {
        Task<Payment> CreatePaymentAsync(PaymentDTO paymentDTO);
        Task<IEnumerable<Payment>> GetPaymentsAsync();
        Task<Payment?> GetPaymentByIdAsync(int id);
        Task<Payment?> UpdatePaymentAsync(int id, PaymentDTO paymentDTO);
        Task<bool> DeletePaymentAsync(int id);
    }
}