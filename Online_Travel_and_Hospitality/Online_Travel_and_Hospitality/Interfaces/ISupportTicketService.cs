using Online_Travel_and_Hospitality.Models.Domain;
using Online_Travel_and_Hospitality.Models.DTO;

namespace Online_Travel_and_Hospitality.Interfaces
{
    public interface ISupportTicketService
    {
        Task<SupportTicket> CreateSupportTicketAsync(SupportTicketDTO supportTicketDTO);
        Task<IEnumerable<SupportTicket>> GetSupportTicketsAsync();
        Task<SupportTicket?> GetSupportTicketByIdAsync(int id);
        Task<SupportTicket?> UpdateSupportTicketAsync(int id, SupportTicketDTO supportTicketDTO);
        Task<bool> DeleteSupportTicketAsync(int id);
    }
}