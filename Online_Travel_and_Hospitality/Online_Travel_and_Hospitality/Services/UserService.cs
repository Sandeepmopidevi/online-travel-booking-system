using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Online_Travel_and_Hospitality.Data;
using Online_Travel_and_Hospitality.Interfaces;
using Online_Travel_and_Hospitality.Models.Domain;
using Online_Travel_and_Hospitality.Models.DTO;

namespace Online_Travel_and_Hospitality.Services
{
    public class UserService : IUserService
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<IdentityUser> _userManager;

        public UserService(ApplicationDbContext context, UserManager<IdentityUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        public async Task<User> CreateUserAsync(UserDTO userDTO)
        {
            // Create Identity User
            var identityUser = new IdentityUser
            {
                UserName = userDTO.Email,
                Email = userDTO.Email
            };

            var createUserResult = await _userManager.CreateAsync(identityUser, userDTO.Password);
            if (!createUserResult.Succeeded)
                throw new ArgumentException(string.Join(", ", createUserResult.Errors.Select(e => e.Description)));

            var roleResult = await _userManager.AddToRoleAsync(identityUser, userDTO.Role);
            if (!roleResult.Succeeded)
                throw new ArgumentException(string.Join(", ", roleResult.Errors.Select(e => e.Description)));

            // Custom User
            var user = new User
            {
                Name = userDTO.Name,
                Email = userDTO.Email,
                Password = userDTO.Password,
                Role = userDTO.Role,
                ContactNumber = userDTO.ContactNumber
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task<IEnumerable<User>> GetUsersAsync()
        {
            return await _context.Users
                .Include(u => u.SupportTickets)
                .Include(u => u.Reviews)
                .Include(u => u.Invoices)
                .Include(u => u.Bookings)
                .Include(u => u.Payments)
                .Include(u => u.Itineraries)
                .ToListAsync();
        }

        public async Task<User?> GetUserByIdAsync(int id)
        {
            return await _context.Users.FindAsync(id);
        }

        public async Task<User?> UpdateUserAsync(int id, UserDTO userDTO)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return null;

            var identityUser = await _userManager.FindByEmailAsync(user.Email);
            if (identityUser == null) throw new ArgumentException("Identity user not found.");

            identityUser.UserName = userDTO.Email;
            identityUser.Email = userDTO.Email;
            var updateResult = await _userManager.UpdateAsync(identityUser);
            if (!updateResult.Succeeded)
                throw new ArgumentException(string.Join(", ", updateResult.Errors.Select(e => e.Description)));

            user.Name = userDTO.Name;
            user.Email = userDTO.Email;
            user.Password = userDTO.Password;
            user.Role = userDTO.Role;
            user.ContactNumber = userDTO.ContactNumber;

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await _context.Users.AnyAsync(e => e.UserId == id))
                    return null;
                else
                    throw;
            }

            return user;
        }

        public async Task<UserDTO?> UpdateUserProfileAsync(string email, UpdateUserNameContactDto updateUser)
        {
            var userProfile = await _context.Users.FirstOrDefaultAsync(up => up.Email == email);
            if (userProfile == null)
            {
                userProfile = new User
                {
                    Name = updateUser.Name,
                    ContactNumber = updateUser.ContactNumber,
                    Email = email
                };
                _context.Users.Add(userProfile);
            }
            else
            {
                userProfile.Name = updateUser.Name;
                userProfile.ContactNumber = updateUser.ContactNumber;
                _context.Users.Update(userProfile);
            }

            await _context.SaveChangesAsync();
            return new UserDTO
            {
                Name = userProfile.Name,
                ContactNumber = userProfile.ContactNumber,
                Email = userProfile.Email,
                Role = userProfile.Role,
                Password = userProfile.Password
            };
        }

        public async Task<bool> DeleteUserAsync(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return false;

            var identityUser = await _userManager.FindByEmailAsync(user.Email);
            if (identityUser != null)
            {
                var deleteResult = await _userManager.DeleteAsync(identityUser);
                if (!deleteResult.Succeeded)
                    throw new ArgumentException(string.Join(", ", deleteResult.Errors.Select(e => e.Description)));
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<int?> GetUserIdByEmailAsync(string email)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
            return user?.UserId;
        }
    }
}