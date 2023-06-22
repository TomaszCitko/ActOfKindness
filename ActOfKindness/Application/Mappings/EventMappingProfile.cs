using Application.Dtos.Event;
using AutoMapper;
using Domain.Models;

namespace Application.Mappings
{
    public class EventMappingProfile : Profile
    {
        public EventMappingProfile()
        {
            CreateMap<Event, DetailsEventDto>();

            CreateMap<CreateEventDto, Event>();
        }
    }
}
