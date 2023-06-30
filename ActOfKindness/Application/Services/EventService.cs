using Application.Dtos.Event;
using Application.Dtos.User;
using Application.Exceptions;
using Application.Interfaces;
using AutoMapper;
using Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace Application.Services
{
    public class EventService : IEventService
    {
        private readonly IEventRepository _eventRepository;
        private readonly IMapper _mapper;
        private readonly IUserContextService _userContextService;

        public EventService(IEventRepository eventRepository, IMapper mapper, IUserContextService userContextService)
        {
            _eventRepository = eventRepository;
            _mapper = mapper;
            _userContextService = userContextService;
        }

        public async Task<List<DetailsEventDto>> GetModeratedEventsAsync()
        {
            var events = await _eventRepository.GetModeratedEventsAsync();

            var eventsDto = _mapper.Map<List<DetailsEventDto>>(events);

            return eventsDto;
        }

        public async Task<List<DetailsEventDto>> GetUnmoderatedEventsAsync()
        {
            var unmoderatedEvents = await _eventRepository.GetUnmoderatedEventsAsync();
            var unmoderatedEventsDto = _mapper.Map<List<DetailsEventDto>>(unmoderatedEvents);

            return unmoderatedEventsDto;
        }

        public async Task CreateEventAsync(CreateEventDto newEventDto)
        {
            if (await _eventRepository.GetEventByIdAsync(newEventDto.Id) is not null)
                throw new BadRequestException($"Event with this ID ({newEventDto.Id}) exist");




            //newEventDto.UserId

            var temporaryImagePlaceHolder =
                "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Vue_de_nuit_de_la_Place_Stanislas_%C3%A0_Nancy.jpg/1920px-Vue_de_nuit_de_la_Place_Stanislas_%C3%A0_Nancy.jpg";

            newEventDto.Image ??= temporaryImagePlaceHolder;

            var newEvent = _mapper.Map<Event>(newEventDto);

            newEvent.UserId = _userContextService.GetUserId;

            await _eventRepository.CreateEventAsync(newEvent);
            await _eventRepository.SaveAsync();
        }

        public async Task DeleteEventAsync(Guid id)
        {
            var eventToDelete = await _eventRepository.GetEventByIdAsync(id);

            if (eventToDelete is null) throw new NotFoundException("Event not found");

            var userId = _userContextService.GetUserId;
            var role = _userContextService.GetUserRole;

            if (eventToDelete.UserId != userId && role == "User") throw new ForbidException();

            await _eventRepository.DeleteEventAsync(id);
        }

        public async Task<DetailsEventDto> GetEventByIdAsync(Guid id)
        {
            var eventDetails = await _eventRepository.GetEventByIdAsync(id);

            if (eventDetails is null) throw new NotFoundException("Event not found");

            var eventDetailsDto = _mapper.Map<DetailsEventDto>(eventDetails);

            return eventDetailsDto;
        }

        public async Task UpdateEventAsync(Guid id, EditEventDto updatedEventDto)
        {
            var eventToUpdate = await _eventRepository.GetEventByIdAsync(id);

            if (eventToUpdate is null) throw new NotFoundException("Event not found");

            var userId = _userContextService.GetUserId;
            var role = _userContextService.GetUserRole;

            if (eventToUpdate.UserId != userId && role == "User") throw new ForbidException();

            await _eventRepository.UpdateEventAsync(id, updatedEventDto);
        }

        public async Task ModerateEventAsync(Guid id)
        {
            var rowsChanged = await _eventRepository.ModerateEventAsync(id);

            if (rowsChanged == 0) throw new NotFoundException("Event not found");
        }

        public async Task<List<DetailsEventDto>> GetFilteredModeratedEventsAsync(EventFilter filter)
        {
            var events = await _eventRepository.GetFilteredModeratedEventsAsync(filter);

            var eventsDto = _mapper.Map<List<DetailsEventDto>>(events);

            return eventsDto;
        }

    }
}
