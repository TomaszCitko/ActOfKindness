using AutoMapper;
using Domain.Dtos.Event;
using Domain.Interfaces.Repositories;
using Domain.Interfaces.Services;
using Domain.Models;

namespace Application.Services
{
    public class EventService : IEventService
    {
        private readonly IEventRepository _eventRepository;
        private readonly IMapper _mapper;

        public EventService(IEventRepository eventRepository, IMapper mapper)
        {
            _eventRepository = eventRepository;
            _mapper = mapper;
        }

        public async Task<List<DetailsEventDto>> GetEvents()
        {
            var events = await _eventRepository.GetEvents();

            var eventsDto = _mapper.Map<List<DetailsEventDto>>(events);

            return eventsDto;
        }

        public async Task CreateEvent(Event newEvent)
        {
            await _eventRepository.CreateEvent(newEvent);
            await _eventRepository.Save();
        }

        public async Task DeleteEvent(Guid id)
        {
            await _eventRepository.DeleteEvent(id);
            await _eventRepository.Save();
        }

        public async Task<Event> GetEventById(Guid id)
        {
            return await _eventRepository.GetEventById(id);
        }

        public async Task UpdateEvent(Guid id, Event updatedEvent)
        {
            await _eventRepository.UpdateEvent(id, updatedEvent);
        }
    }
}
