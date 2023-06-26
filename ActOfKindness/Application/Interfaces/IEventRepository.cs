using Application.Dtos.Event;
using Domain.Models;

namespace Application.Interfaces;

public interface IEventRepository
{
    Task<List<Event>> GetEvents();
    Task<List<Event>> GetUnmoderatedEvents();
    Task<Event?> GetEventById(Guid id);
    Task<int> DeleteEvent(Guid id);
    Task CreateEvent(Event newEvent);
    Task<int> UpdateEvent(Guid id, EditEventDto eventDto);
    Task Save();
}