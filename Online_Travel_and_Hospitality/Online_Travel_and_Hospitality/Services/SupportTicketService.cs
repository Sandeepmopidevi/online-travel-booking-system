using Microsoft.EntityFrameworkCore;
using Online_Travel_and_Hospitality.Data;
using Online_Travel_and_Hospitality.Interfaces;
using Online_Travel_and_Hospitality.Models.Domain;
using Online_Travel_and_Hospitality.Models.DTO;

namespace Online_Travel_and_Hospitality.Services
{
    public class SupportTicketService : ISupportTicketService
    {
        private readonly ApplicationDbContext _context;

        public SupportTicketService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<SupportTicket> CreateSupportTicketAsync(SupportTicketDTO supportTicketDTO)
        {
            var tempUser = await _context.Users.FirstOrDefaultAsync(z => z.UserId == supportTicketDTO.UserId);
            if (tempUser == null)
                throw new ArgumentException($"User with ID {supportTicketDTO.UserId} does not exist");

            var supportTicket = new SupportTicket
            {
                Status = supportTicketDTO.Status,
                Issue = supportTicketDTO.Issue,
                AssignedAgent = supportTicketDTO.AssignedAgent,
                UserID = supportTicketDTO.UserId
            };

            _context.SupportTicket.Add(supportTicket);
            await _context.SaveChangesAsync();
            return supportTicket;
        }

        public async Task<IEnumerable<SupportTicket>> GetSupportTicketsAsync()
        {
            return await _context.SupportTicket.ToListAsync();
        }

        public async Task<SupportTicket?> GetSupportTicketByIdAsync(int id)
        {
            return await _context.SupportTicket.FindAsync(id);
        }

        public async Task<SupportTicket?> UpdateSupportTicketAsync(int id, SupportTicketDTO supportTicketDTO)
        {
            var supportTicket = await _context.SupportTicket.FindAsync(id);
            if (supportTicket == null)
                return null;

            supportTicket.Status = supportTicketDTO.Status;
            supportTicket.Issue = supportTicketDTO.Issue;
            supportTicket.AssignedAgent = supportTicketDTO.AssignedAgent;
            supportTicket.UserID = supportTicketDTO.UserId;

            _context.Entry(supportTicket).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return supportTicket;
        }

        public async Task<bool> DeleteSupportTicketAsync(int id)
        {
            var supportTicket = await _context.SupportTicket.FindAsync(id);
            if (supportTicket == null)
                return false;

            _context.SupportTicket.Remove(supportTicket);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}