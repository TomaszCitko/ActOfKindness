using Application.Dtos.User;
using Domain.Models;

namespace Application.Dtos.Event
{
    public record DetailsEventDto(Guid Id, string UserId, UserEventDto CreatedBy, DateTime CreatedTime,
        string Localization, bool IsOnline, string Title, string Description, DateTime StartingDate,
        DateTime EndingDate, bool IsFinished, double Latitude, double Longitude, EventType Type, string Image);
}
