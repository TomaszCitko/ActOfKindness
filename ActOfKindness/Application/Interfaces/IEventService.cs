using Application.Dtos.Event;
using Domain.Models;

namespace Application.Interfaces
{
    public interface IEventService
    {
        Task<PaginatedResults<List<DetailsEventDto>>> GetModeratedEventsAsync(int pageNumber);
        Task<List<DetailsEventDto>> GetUnmoderatedEventsAsync();
        Task CreateEventAsync(CreateEventDto newEvent);
        Task DeleteEventAsync(Guid id);
        Task<DetailsEventDto> GetEventByIdAsync(Guid id);
        Task UpdateEventAsync(Guid id, EditEventDto updatedEvent);
        Task ModerateEventAsync(Guid id);
        Task<List<DetailsEventDto>> GetFilteredModeratedEventsAsync(EventFilter filter);
        Task<List<ParticipantDto>> GetParticipantsAsync(Guid eventId);
        Task JoinEventAsync(Guid eventId);
        Task LeaveEventAsync(Guid eventId);
    }
}
