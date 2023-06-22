using Application.Dtos.Event;
using Domain.Models;

namespace Application.Services.Interfaces
{
    public interface IEventService
    {
        Task<List<DetailsEventDto>> GetEvents();
        Task CreateEvent(CreateEventDto newEvent);
        Task DeleteEvent(Guid id);
        Task<DetailsEventDto> GetEventById(Guid id);
        Task UpdateEvent(Guid id, EditEventDto updatedEvent);
    }
}
