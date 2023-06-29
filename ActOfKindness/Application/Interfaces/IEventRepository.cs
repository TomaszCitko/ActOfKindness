using Application.Dtos.Event;
using Domain.Models;

namespace Application.Interfaces;

public interface IEventRepository
{
    Task<List<Event>> GetModeratedEvents();
    Task<List<Event>> GetUnmoderatedEvents();
    Task<Event?> GetEventById(Guid id);
    Task<int> DeleteEvent(Guid id);
    Task CreateEvent(Event newEvent);
    Task<int> UpdateEvent(Guid id, EditEventDto eventDto);
    Task<int> ModerateEvent(Guid id);
    Task Save();
    Task<List<Event>> GetFilteredModeratedEventsAsync(EventFilter filter);
}