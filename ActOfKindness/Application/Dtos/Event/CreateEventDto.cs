using Domain.Models;

namespace Application.Dtos.Event
{
    public class CreateEventDto
    {
        public Guid Id { get; set; }
        public string? Localization { get; set; }
        public bool IsOnline { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string StartingDate { get; set; }
        public string EndingDate { get; set; }
        public double? Latitude { get; set; }
        public double? Longitude { get; set; }
        public EventType Type { get; set; }
        public string? Image { get; set; }
    }
}
