using Microsoft.AspNetCore.Identity;

namespace Domain.Models;

public class AppUser : IdentityUser
{
    public int? Hearts { get; set; }
    public string? Skills { get; set; }
    public string? Nickname { get; set; }
    public string? Location { get; set; }
    public double? Latitude { get; set; }
    public double? Longitude { get; set; }
    public IEnumerable<Event> CreatedEvents { get; set; }
    public IEnumerable<EventUser> ParticipatedEvents { get; set; }
    public ICollection<Photo?> Photos { get; set; }

}