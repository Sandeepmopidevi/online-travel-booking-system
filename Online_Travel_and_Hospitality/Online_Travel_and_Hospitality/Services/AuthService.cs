using Microsoft.AspNetCore.Identity;
using Online_Travel_and_Hospitality.Data;
using Online_Travel_and_Hospitality.DTO;
using Online_Travel_and_Hospitality.Interfaces;
using Online_Travel_and_Hospitality.Models.Domain;
using Online_Travel_and_Hospitality.Models.DTO;

namespace Online_Travel_and_Hospitality.Services
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<IdentityUser> userManager;
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly AuthDbContext authDbContext;
        private readonly ApplicationDbContext dataDbContext;
        private readonly ITokenRepository tokenRepository;

        public AuthService(
            UserManager<IdentityUser> userManager,
            RoleManager<IdentityRole> roleManager,
            AuthDbContext authDbContext,
            ApplicationDbContext dataDbContext,
            ITokenRepository tokenRepository)
        {
            this.userManager = userManager;
            this.roleManager = roleManager;
            this.authDbContext = authDbContext;
            this.dataDbContext = dataDbContext;
            this.tokenRepository = tokenRepository;
        }

        public async Task<(bool Success, IEnumerable<string> Errors)> RegisterAsync(RegisterRequestDto request)
        {
            var validRoles = new[] { "Admin", "Traveller", "Hotel Manager", "Travel Agent" };
            if (!validRoles.Contains(request.Role))
            {
                return (false, new[] { "Invalid role selected." });
            }

            var existingUser = await userManager.FindByEmailAsync(request.Email);
            if (existingUser != null)
            {
                return (false, new[] { "A user with this email already exists." });
            }

            var identityUser = new IdentityUser
            {
                UserName = request.Email,
                Email = request.Email
            };

            var createUserResult = await userManager.CreateAsync(identityUser, request.Password);
            if (!createUserResult.Succeeded)
            {
                return (false, createUserResult.Errors.Select(e => e.Description));
            }

            // Ensure the role exists
            if (!await roleManager.RoleExistsAsync(request.Role))
            {
                var roleResult = await roleManager.CreateAsync(new IdentityRole(request.Role));
                if (!roleResult.Succeeded)
                {
                    return (false, roleResult.Errors.Select(e => e.Description));
                }
            }

            var roleAssignResult = await userManager.AddToRoleAsync(identityUser, request.Role);
            if (!roleAssignResult.Succeeded)
            {
                return (false, roleAssignResult.Errors.Select(e => e.Description));
            }

            // Add to custom Users table
            var user = new User
            {
                Name = request.Name,
                Email = request.Email,
                Password = "Password Not Stored", // Hash will be implemented in further sprint
                Role = request.Role,
                ContactNumber = request.ContactNumber
            };

            dataDbContext.Users.Add(user);
            await dataDbContext.SaveChangesAsync();

            return (true, null);
        }

        public async Task<(bool Success, LoginResponseDto Response, string Error)> LoginAsync(LoginRequestDto request)
        {
            if (string.IsNullOrWhiteSpace(request.Email) || string.IsNullOrWhiteSpace(request.Password))
            {
                return (false, null, "Email and Password are required.");
            }

            var identityUser = await userManager.FindByEmailAsync(request.Email);
            if (identityUser == null)
            {
                return (false, null, "Invalid email or password.");
            }

            var checkPasswordResult = await userManager.CheckPasswordAsync(identityUser, request.Password);
            if (!checkPasswordResult)
            {
                return (false, null, "Invalid email or password.");
            }

            var roles = await userManager.GetRolesAsync(identityUser);

            var jwtToken = tokenRepository.CreateJwtToken(identityUser, roles.ToList());

            var response = new LoginResponseDto
            {
                Email = request.Email,
                Roles = roles.ToList(),
                Token = jwtToken
            };

            return (true, response, null);
        }
    }
}