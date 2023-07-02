using Domain.Models;

namespace Application.Dtos.Event;

public class ParticipantDto
{
    public string UserName { get; set; }
    public string Location { get; set; }
    public string Avatar { get; set; }
}