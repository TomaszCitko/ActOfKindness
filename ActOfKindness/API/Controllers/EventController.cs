using Domain.Interfaces;
using Domain.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventController : ControllerBase
    {
        private readonly IEventRepository _eventRepository;

        public EventController(IEventRepository iEventRepository)    
        {
            _eventRepository = iEventRepository;
        }

        [HttpGet]
        public async Task<ActionResult<List<Event>>> GetEvents()
        {
            return await _eventRepository.GetEvents();
        }

        [HttpPost]
        public async Task<ActionResult> CreateEvent(Event newEvent)
        {
            await _eventRepository.CreateEvent(newEvent);
            await _eventRepository.Save();
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteEvent(int id)
        {
            await _eventRepository.DeleteEvent(id);
            await _eventRepository.Save();
            return Ok();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Event>> GetEventById(int id)
        {
            return await _eventRepository.GetEventById(id);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateEvent(int id, Event entity)
        {
            await _eventRepository.UpdateEvent(id, entity);
            await _eventRepository.Save();
            return Ok();
        }
    }
}
