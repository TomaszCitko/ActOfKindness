using Application.Dtos.Event;
using Domain.Models;

namespace Application.Interfaces
{
    public interface IEventService
    {
        Task<PaginatedResults<List<DetailsEventDto>>> GetModeratedEventsAsync(int pageNumber);
        Task<List<DetailsEventDto>> GetUserEvents(string username);
        Task<List<DetailsEventDto>> GetUnmoderatedEventsAsync();
        Task CreateEventAsync(CreateEventDto newEvent);
        Task DeleteEventAsync(Guid id);
        Task<DetailsEventDto> GetEventByIdAsync(Guid id);
        Task UpdateEventAsync(Guid id, EditEventDto updatedEvent);
        Task ModerateEventAsync(Guid id);
        Task<PaginatedResults<List<DetailsEventDto>>> GetFilteredModeratedEventsAsync(EventFilter filter, int pageNumber);
        Task<List<ParticipantDto>> GetParticipantsAsync(Guid eventId);
        Task JoinEventAsync(Guid eventId);
        Task LeaveEventAsync(Guid eventId);
    }
}
