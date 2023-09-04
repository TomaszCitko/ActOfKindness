using Microsoft.AspNetCore.Identity;

namespace Domain.Models;

public class AppUser : IdentityUser
{
    public int? Hearts { get; set; }
    public string? Nickname { get; set; }
    public string? Location { get; set; }
    public string? Bio { get; set; }
    public IEnumerable<Event> CreatedEvents { get; set; }
    public IEnumerable<EventUser> ParticipatedEvents { get; set; }
    public ICollection<Photo?> Photos { get; set; }

}