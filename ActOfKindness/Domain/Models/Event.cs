using System.ComponentModel.DataAnnotations;

namespace Domain.Models
{
    public class Event
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public DateTime CreatedTime { get; set; } = DateTime.Now;
        [MaxLength(30)]
        public string? Localization { get; set; }
        public bool IsOnline { get; set; }
        [MaxLength(80)]
        public string Title { get; set; }
        [MaxLength(2000)]
        public string Description { get; set; }
        public DateTime StartingDate { get; set; }
        public DateTime EndingDate { get; set; }
        public bool IsDone { get; set; }
        public double? Latitude { get; set; }
        public double? Longitude { get; set; }
        public bool IsModerated { get; set; } = true;
        public EventType Type { get; set; }
        public string Image { get; set; }
    }

    public enum EventType
    {
        HelpNeeded,
        HelpOffer
    }
}
