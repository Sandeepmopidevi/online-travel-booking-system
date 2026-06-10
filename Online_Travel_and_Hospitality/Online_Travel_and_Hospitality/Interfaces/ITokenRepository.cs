using Microsoft.AspNetCore.Identity;

namespace Online_Travel_and_Hospitality.Interfaces
{
    // Interface for the token repository
    public interface ITokenRepository
    {
        // Method to create a JWT token for a given user and their roles
        string CreateJwtToken(IdentityUser user, List<string> roles);
    }
}
