using Domain.Dtos.Event;
using Domain.Models;

namespace Domain.Interfaces.Services
{
    public interface IEventService
    {
        Task<List<DetailsEventDto>> GetEvents();
        Task CreateEvent(CreateEventDto newEvent);
        Task DeleteEvent(Guid id);
        Task<Event> GetEventById(Guid id);
        Task UpdateEvent(Guid id, Event updatedEvent);
    }
}
