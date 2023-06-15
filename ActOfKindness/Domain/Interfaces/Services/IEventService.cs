using Domain.Models;

namespace Domain.Interfaces.Services
{
    public interface IEventService
    {
        Task<List<Event>> GetEvents();
        Task CreateEvent(Event newEvent);
        Task DeleteEvent(int id);
        Task<Event> GetEventById(int id);
        Task UpdateEvent(int id, Event updatedEvent);
    }
}
