using System.Globalization;
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

            CreateMap<AppUser, UserEventDto>();

            CreateMap<CreateEventDto, Event>()
                .ForMember(dest => dest.StartingDate, opt => opt.MapFrom(src => DateTime.ParseExact(src.StartingDate, "dd/MM/yyyy", CultureInfo.InvariantCulture)))
                .ForMember(dest => dest.EndingDate, opt => opt.MapFrom(src => DateTime.ParseExact(src.EndingDate, "dd/MM/yyyy", CultureInfo.InvariantCulture)));
        }
    }
}
