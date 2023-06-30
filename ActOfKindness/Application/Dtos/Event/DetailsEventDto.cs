using Application.Dtos.User;
using Domain.Models;

namespace Application.Dtos.Event
{
    public class DetailsEventDto
    {
        public Guid Id { get; set; }
        public string UserId { get; set; }
        public UserDto CreatedBy { get; set; }
        public DateTime CreatedTime { get; set; }
        public string Localization { get; set; }
        public bool IsOnline { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime StartingDate { get; set; }
        public DateTime EndingDate { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public string Image { get; set; }
        public EventType Type { get; set; }
    }
}
