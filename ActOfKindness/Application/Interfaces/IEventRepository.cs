using Application.Dtos.Event;
using Domain.Models;

namespace Application.Interfaces;

public interface IEventRepository
{
    Task<List<Event>> GetModeratedEventsAsync(int pageNumber, int pageSize);
    Task<List<Event>> GetUserEventsAsync(string username);
    Task<int> GetQuantityOfModeratedEventAsync();
    Task<List<Event>> GetUnmoderatedEventsAsync();
    Task<Event?> GetEventByIdAsync(Guid id);
    Task<Event?> GetEventByIdForComments(Guid id);
    Task DeleteEventAsync(Guid id);
    Task CreateEventAsync(Event newEvent);
    Task UpdateEventAsync(Guid id, EditEventDto eventDto);
    Task<int> ModerateEventAsync(Guid id);
    Task SaveAsync();
    Task<List<Event>> GetFilteredModeratedEventsAsync(EventFilter filter);
}