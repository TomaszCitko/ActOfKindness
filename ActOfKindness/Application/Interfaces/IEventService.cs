using Application.Dtos.Event;
using Application.Dtos.User;
using Domain.Models;

namespace Application.Interfaces
{
    public interface IEventService
    {
        Task<List<DetailsEventDto>> GetModeratedEvents();
        Task<List<DetailsEventDto>> GetUnmoderatedEvents();
        Task CreateEvent(CreateEventDto newEvent);
        Task DeleteEvent(Guid id);
        Task<DetailsEventDto> GetEventById(Guid id);
        Task UpdateEvent(Guid id, EditEventDto updatedEvent);
        Task<UserDto> GetUserById(Guid id);
        Task<List<DetailsEventDto>> GetFilteredEvents(string? location, string? type, string? startingDate, string? endingDate);
        Task ModerateEvent(Guid id);
    }
}
