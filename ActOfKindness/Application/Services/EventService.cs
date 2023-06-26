using Application.Dtos.Event;
using Application.Interfaces;
using AutoMapper;
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

        public async Task CreateEvent(CreateEventDto newEventDto)
        {
            var temporaryImagePlaceHolder =
                "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Vue_de_nuit_de_la_Place_Stanislas_%C3%A0_Nancy.jpg/1920px-Vue_de_nuit_de_la_Place_Stanislas_%C3%A0_Nancy.jpg";

            newEventDto.Image ??= temporaryImagePlaceHolder;

            var newEvent = _mapper.Map<Event>(newEventDto);

            await _eventRepository.CreateEvent(newEvent);
            await _eventRepository.Save();
        }

        public async Task DeleteEvent(Guid id)
        {
            await _eventRepository.DeleteEvent(id);
        }

        public async Task<DetailsEventDto> GetEventById(Guid id)
        {
            var eventDetails = await _eventRepository.GetEventById(id);

            var eventDetailsDto = _mapper.Map<DetailsEventDto>(eventDetails);

            return eventDetailsDto;
        }

        public async Task UpdateEvent(Guid id, EditEventDto updatedEventDto)
        {
            var rowsChanged = await _eventRepository.UpdateEvent(id, updatedEventDto);
        }
    }
}
