using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using Online_Travel_and_Hospitality.Interfaces;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text; // for text encoding

namespace Online_Travel_and_Hospitality.Services
{
    // This class implements the functionality to create JWT tokens
    public class TokenRepository : ITokenRepository
    {
        private readonly IConfiguration configuration;


        //Constructor to initialize the repository with the configuration settings
        public TokenRepository(IConfiguration configuration)
        {
            this.configuration = configuration;
        }


        // Method to create a JWT token for a given user and their roles
        public string CreateJwtToken(IdentityUser user, List<string> roles)
        {
            // Create Claims
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Email, user.Email), // adding user's email as a claim
                new Claim(ClaimTypes.Name, user.UserName), // Add User's name as a claim
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()) // Adding a unique identifier for the token
            };

            // Adding the user's roles as claims
            claims.AddRange(roles.Select(role => new Claim(ClaimTypes.Role, role)));

            // JWT Security Token Parameters
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"])); // Getting the secret key from configuration
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256); // Creating signing credentials with the secret key

            var token = new JwtSecurityToken(
                issuer: configuration["Jwt:Issuer"], // Setting the issuer of the token
                audience: configuration["Jwt:Audience"], // Setting the audience of the token
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(300), // Setting the token to expire in 300 minutes
                signingCredentials: credentials); // Adding the signing credentials to the token


            // Returning the serialized JWT token
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}