using Application.Dtos.Event;
using Application.Dtos.User;
using Domain.Models;

namespace Application.Interfaces;

public interface IEventRepository
{
    Task<List<Event>> GetEvents();
    Task<Event?> GetEventById(Guid id);
    Task<int> DeleteEvent(Guid id);
    Task CreateEvent(Event newEvent);
    Task<int> UpdateEvent(Guid id, EditEventDto eventDto);
    Task Save();
    Task<AppUser?> GetUserById(Guid id);

    Task<List<Event>> GetFilteredEvents(string? location, string? type, string? startingDate, string? endingDate);
}

