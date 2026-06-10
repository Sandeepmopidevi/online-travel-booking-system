using Online_Travel_and_Hospitality.Models.Domain;
using Online_Travel_and_Hospitality.Models.DTO;

namespace Online_Travel_and_Hospitality.Interfaces
{
    public interface IUserService
    {
        Task<User> CreateUserAsync(UserDTO userDTO);
        Task<IEnumerable<User>> GetUsersAsync();
        Task<User?> GetUserByIdAsync(int id);
        Task<User?> UpdateUserAsync(int id, UserDTO userDTO);
        Task<UserDTO?> UpdateUserProfileAsync(string email, UpdateUserNameContactDto updateUser);
        Task<bool> DeleteUserAsync(int id);
        Task<int?> GetUserIdByEmailAsync(string email);
    }
}