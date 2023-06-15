using Domain.Dtos.Event;
using Domain.Interfaces.Services;
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
        public async Task<ActionResult> CreateEvent(Event newEvent)
        {
            await _eventService.CreateEvent(newEvent);

            return Ok();
        }

        [HttpDelete("{Guid}")]
        public async Task<ActionResult> DeleteEvent(Guid id)
        {
            await _eventService.DeleteEvent(id);

            return Ok();
        }

        [HttpGet("{Guid}")]
        public async Task<ActionResult<Event>> GetEventById(Guid id)
        {
            return await _eventService.GetEventById(id);
        }

        [HttpPut("{Guid}")]
        public async Task<ActionResult> UpdateEvent([FromRoute]Guid id, [FromBody]Event entity)
        {
            await _eventService.UpdateEvent(id, entity);

            return Ok();
        }
    }
}
