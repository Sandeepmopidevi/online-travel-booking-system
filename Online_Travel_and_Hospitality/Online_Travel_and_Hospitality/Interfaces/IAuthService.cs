using Online_Travel_and_Hospitality.DTO;
using Online_Travel_and_Hospitality.Models.DTO;


namespace Online_Travel_and_Hospitality.Interfaces
{
    public interface IAuthService
    {
        Task<(bool Success, IEnumerable<string> Errors)> RegisterAsync(RegisterRequestDto request);
        Task<(bool Success, LoginResponseDto Response, string Error)> LoginAsync(LoginRequestDto request);
    }
}