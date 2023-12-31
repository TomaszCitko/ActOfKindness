﻿using Application.Dtos.Event;
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
        public async Task<ActionResult<PaginatedResults<List<DetailsEventDto>>>> GetModeratedEvents([FromQuery]int pageNumber = 1)
        {
            return await _eventService.GetModeratedEventsAsync(pageNumber);
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
            var test = await _eventService.GetEventByIdAsync(id);
            return await _eventService.GetEventByIdAsync(id);
        }

        [HttpGet("getUserEvents/{username}")]
        public async Task<ActionResult<List<DetailsEventDto>>> GetEventsForUser(string username)
        {
            var result = await _eventService.GetUserEvents(username);
            return Ok(result);
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
        public async Task<ActionResult<PaginatedResults<List<DetailsEventDto>>>> GetFilteredModeratedEventsAsync([FromQuery] EventFilter filter, [FromQuery]int pageNumber = 1)
        {
            return await _eventService.GetFilteredModeratedEventsAsync(filter, pageNumber);
        }

        [AllowAnonymous]
        [HttpGet("{id:guid}/participants")]
        public async Task<ActionResult<List<ParticipantDto>>> GetParticipants(Guid id)
        {
            return await _eventService.GetParticipantsAsync(id);
        }

        [HttpPost("{eventId:guid}/join")]
        public async Task<ActionResult> AddUserToEvent(Guid eventId)
        {
            await _eventService.JoinEventAsync(eventId);
            return Ok();
        }

        [HttpPost("{eventId:guid}/leave")]
        public async Task<ActionResult> RemoveUserFromEvent(Guid eventId)
        {
            await _eventService.LeaveEventAsync(eventId);
            return Ok();
        }

    }
}
