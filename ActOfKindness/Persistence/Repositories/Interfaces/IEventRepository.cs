using Domain.Models;

namespace Persistence.Repositories.Interfaces;

public interface IEventRepository
{
    Task<List<Event>> GetEvents();
    Task<Event> GetEventById(Guid id);
    Task DeleteEvent(Guid id);
    Task CreateEvent(Event newEvent);
    Task UpdateEvent(Guid id, Event entity);
    Task Save();
}