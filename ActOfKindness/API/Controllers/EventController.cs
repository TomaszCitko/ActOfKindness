using Application.Dtos.Event;
using Application.Dtos.User;
using Application.Interfaces;
using Domain.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventController : ControllerBase
    {
        private readonly IEventService _eventService;

        public EventController(IEventService eventService)
        {
            _eventService = eventService;
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<List<DetailsEventDto>>> GetModeratedEvents()
        {
            return await _eventService.GetModeratedEventsAsync();
        }

        [Authorize(Roles = "Moderator, Admin")]
        [HttpGet("unmoderated")]
        public async Task<ActionResult<List<DetailsEventDto>>> GetUnmoderatedEvents()
        {
            return await _eventService.GetUnmoderatedEventsAsync();
        }

        [HttpPost]
        public async Task<ActionResult> CreateEvent(CreateEventDto newEvent)
        {
            await _eventService.CreateEventAsync(newEvent);

            return Ok();
        }

        [HttpDelete("{id:guid}")]
        public async Task<ActionResult> DeleteEvent([FromRoute]Guid id)
        {
            await _eventService.DeleteEventAsync(id);

            return Ok();
        }

        [AllowAnonymous]
        [HttpGet("{id:guid}")]
        public async Task<ActionResult<DetailsEventDto>> GetEventById([FromRoute]Guid id)
        {
            return await _eventService.GetEventByIdAsync(id);
        }

        [HttpPut("{id:guid}")]
        public async Task<ActionResult> UpdateEvent([FromRoute]Guid id, [FromBody]EditEventDto eventDto)
        {
            await _eventService.UpdateEventAsync(id, eventDto);

            return Ok();
        }

        [Authorize(Roles = "Moderator, Admin")]
        [HttpPatch("{id:guid}/moderate")]
        public async Task<ActionResult> ModerateEvent([FromRoute] Guid id)
        {
            await _eventService.ModerateEventAsync(id);

            return Ok();
        }

        [AllowAnonymous]
        [HttpGet("filter")]
        public async Task<ActionResult<List<DetailsEventDto>>> GetFilteredModeratedEventsAsyn([FromQuery] EventFilter filter)
        {
            return await _eventService.GetFilteredModeratedEventsAsync(filter);
        }

        [HttpGet("{id:guid}/participants")]
        public async Task<ActionResult<List<ParticipantDto>> >GetParticipantsAsync(Guid id)
        {
            return await _eventService.ReturnParticipantsDto(id);
        }

        [HttpGet("{eventId:guid}/join")]
        public async Task<ActionResult> AddUserToEventAsync(Guid eventId)
        {
            await _eventService.JoinEventAsync(eventId);
            return Ok();
        }

    }
}
