namespace Application.Dtos.Profile;

public class ProfileDto
{
    public Guid Id { get; set; }
    public string Username { get; set; }
    public string Nickname { get; set; }
    public string Location { get; set; }
    public string Bio { get; set; }
    public string MainPhotoUrl { get; set; }
    public ICollection<Domain.Models.Photo> Photos { get; set; }
}