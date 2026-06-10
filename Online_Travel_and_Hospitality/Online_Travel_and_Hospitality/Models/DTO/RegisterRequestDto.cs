using System.ComponentModel.DataAnnotations;

namespace Online_Travel_and_Hospitality.Models.DTO
{
    public class RegisterRequestDto
    {
        [Required]
        public string Name { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [MinLength(8)]
        public string Password { get; set; }

        [Required]
        public string Role { get; set; }

        [Required]
        [Phone]
        [MinLength(10)]
        [MaxLength(10)]
        public string ContactNumber { get; set; }
    }
}