using Domain.Models;

namespace Domain.Interfaces;

public interface IEventRepository
{
    Task<List<Event>> GetEvents();
    Task<Event> GetEventById(int id);
    Task DeleteEvent(int id);
    Task CreateEvent(Event newEvent);
    Task UpdateEvent(int id, Event entity);
    Task Save();
}