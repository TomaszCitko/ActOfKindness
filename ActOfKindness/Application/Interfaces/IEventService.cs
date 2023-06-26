using Application.Dtos.Event;
using Domain.Models;

namespace Application.Interfaces
{
    public interface IEventService
    {
        Task<List<Event>> GetEvents();
        Task<List<Event>> GetUnmoderatedEvents();
        Task CreateEvent(CreateEventDto newEvent);
        Task DeleteEvent(Guid id);
        Task<DetailsEventDto> GetEventById(Guid id);
        Task UpdateEvent(Guid id, EditEventDto updatedEvent);
    }
}
