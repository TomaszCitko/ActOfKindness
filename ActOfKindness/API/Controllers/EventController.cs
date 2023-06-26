using Application.Dtos.Event;
using Application.Interfaces;
using Domain.Models;
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

        [HttpGet]
        public async Task<ActionResult<List<DetailsEventDto>>> GetEvents()
        {
            return await _eventService.GetEvents();
        }

        [HttpPost]
        public async Task<ActionResult> CreateEvent([FromBody]CreateEventDto newEvent)
        {
            await _eventService.CreateEvent(newEvent);

            return Ok();
        }

        [HttpDelete("{id:guid}")]
        public async Task<ActionResult> DeleteEvent([FromRoute]Guid id)
        {
            await _eventService.DeleteEvent(id);

            return Ok();
        }

        [HttpGet("{id:guid}")]
        public async Task<ActionResult<DetailsEventDto>> GetEventById([FromRoute]Guid id)
        {
            return await _eventService.GetEventById(id);
        }

        [HttpPut("{id:guid}")]
        public async Task<ActionResult> UpdateEvent([FromRoute]Guid id, [FromBody]EditEventDto eventDto)
        {
            await _eventService.UpdateEvent(id, eventDto);

            return Ok();
        }
    }
}
