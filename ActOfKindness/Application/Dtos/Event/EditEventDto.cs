namespace Application.Dtos.Event
{
    public record EditEventDto(string? Localization, bool IsOnline, string Title, string Description,
        string StartingDate, string EndingDate, double? Latitude, double? Longitude, string Image);
}
