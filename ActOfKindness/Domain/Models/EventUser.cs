namespace Domain.Models
{
    public class EventUser
    {
        public string UserId { get; set; }
        public AppUser User { get; set; }
        public Guid EventId { get; set; }
        public Event Event { get; set; }
    }
}
