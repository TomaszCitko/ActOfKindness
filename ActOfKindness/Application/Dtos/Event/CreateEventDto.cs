using Domain.Models;

namespace Application.Dtos.Event
{
    public record CreateEventDto(Guid Id, string? Localization, bool IsOnline, string Title, string Description, string StartingDate,
        string EndingDate, double? Latitude, double? Longitude, EventType Type, string? Image);
}
