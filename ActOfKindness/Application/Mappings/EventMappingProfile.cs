using Application.Dtos.Event;
using Application.Dtos.User;
using AutoMapper;
using Domain.Models;

namespace Application.Mappings
{
    public class EventMappingProfile : Profile
    {
        public EventMappingProfile()
        {
            CreateMap<Event, DetailsEventDto>()
                .ForMember(dest => dest.CreatedBy, opt => opt.MapFrom(src => src.CreatedBy));

            CreateMap<AppUser, UserDto>();

            CreateMap<CreateEventDto, Event>();
        }
    }
}
