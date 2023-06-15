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

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteEvent(int id)
        {
            await _eventService.DeleteEvent(id);

            return Ok();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Event>> GetEventById(int id)
        {
            return await _eventService.GetEventById(id);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateEvent([FromRoute]int id, [FromBody]Event entity)
        {
            await _eventService.UpdateEvent(id, entity);

            return Ok();
        }
    }
}
