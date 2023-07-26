namespace Application.Dtos.User;

public class UserDto
{
    public Guid Id { get; set; }
    public string Username { get; set; }
    public string Location { get; set; }
    public string Role { get; set; }
    public string Token { get; set; }
    public string MainPhotoUrl { get; set; }
    public ICollection<Domain.Models.Photo> Photos { get; set; }
}