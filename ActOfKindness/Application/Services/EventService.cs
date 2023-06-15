using Domain.Interfaces;
using Domain.Interfaces.Services;
using Domain.Models;

namespace Application.Services
{
    public class EventService : IEventService
    {
        private readonly IEventRepository _eventRepository;

        public EventService(IEventRepository eventRepository)
        {
            _eventRepository = eventRepository;
        }

        public async Task<List<Event>> GetEvents()
        {
            var events = await _eventRepository.GetEvents();

            return events;
        }

        public async Task CreateEvent(Event newEvent)
        {
            await _eventRepository.CreateEvent(newEvent);
            await _eventRepository.Save();
        }

        public async Task DeleteEvent(int id)
        {
            await _eventRepository.DeleteEvent(id);
            await _eventRepository.Save();
        }

        public async Task<Event> GetEventById(int id)
        {
            return await _eventRepository.GetEventById(id);
        }

        public async Task UpdateEvent(int id, Event updatedEvent)
        {
            await _eventRepository.UpdateEvent(id, updatedEvent);
        }
    }
}
