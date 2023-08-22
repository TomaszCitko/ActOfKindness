using System.ComponentModel.DataAnnotations;

namespace Application.Dtos.User;

public class RegisterDto
{
    [Required] 
    public string Username { get; set; }
    [Required]
    [RegularExpression("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{7,40}", ErrorMessage = "Stronger password please")]
    public string Password { get; set; }
    [Required] 
    [EmailAddress] 
    public string Email { get; set; }
    [Required]
    public string Nickname { get; set; }
}