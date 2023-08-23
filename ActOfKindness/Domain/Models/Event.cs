namespace Domain.Models
{
    public class Event
    {
        public Guid Id { get; set; }
        public string UserId { get; set; }
        public AppUser CreatedBy { get; set; }
        public DateTime CreatedTime { get; set; } = DateTime.Now;
        public string? Localization { get; set; }
        public bool IsOnline { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime StartingDate { get; set; }
        public DateTime EndingDate { get; set; }
        public bool IsFinished { get; set; }
        public double? Latitude { get; set; }
        public double? Longitude { get; set; }
        public bool IsModerated { get; set; }
        public EventType Type { get; set; }
        public string Image { get; set; }
        public List<EventUser> Participants { get; set; } = new();
        public ICollection<Comment> Comments { get; set; } 
        public ICollection<Photo> Photos { get; set; }
    }

    public enum EventType
    {
        HelpNeeded,
        HelpOffer
    }
}
