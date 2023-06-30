using Domain.Models;

namespace Application.Dtos.Event;

public class ParticipantsDto
{
    public List<ParticipantDto> participants = new List<ParticipantDto>();

    public void AddUser(EventUser user)
    {
        var newParticipant = new ParticipantDto
        {
            UserName = user.User.UserName,
            Location = user.User.Location,
            Avatar = "https://api.multiavatar.com/Binx Bond.png"
        };
        participants.Add(newParticipant);
    }
}

public class ParticipantDto
{
    public string UserName { get; set; }
    public string Location { get; set; }
    public string Avatar { get; set; }
}