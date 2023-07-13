using Application.Dtos.Event;
using Application.Dtos.Profile;
using System.Globalization;
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
                .ForMember(dest => dest.CreatedBy, opt => opt.MapFrom(src => src.CreatedBy))
                .ForMember(dest=>dest.Image,opt=>opt
                    .MapFrom(src=> src.Photos
                        .FirstOrDefault(x=>x.IsMain).Url));

            CreateMap<AppUser, UserEventDto>();
            
            CreateMap<CreateEventDto, Event>();

            CreateMap<AppUser, ProfileDto>()
                .ForMember(d => d.MainPhotoUrl, o => o
                    .MapFrom(s => s.Photos
                        .FirstOrDefault(x => x.IsMain).Url));

            CreateMap<AppUser, UserDto>()
                .ForMember(d => d.MainPhotoUrl, o => o
                    .MapFrom(s => s.Photos
                        .FirstOrDefault(x => x.IsMain).Url));
                        
            CreateMap<CreateEventDto, Event>()
                .ForMember(dest => dest.StartingDate, opt => opt.MapFrom(src => DateTime.ParseExact(src.StartingDate, "dd/MM/yyyy", CultureInfo.InvariantCulture)))
                .ForMember(dest => dest.EndingDate, opt => opt.MapFrom(src => DateTime.ParseExact(src.EndingDate, "dd/MM/yyyy", CultureInfo.InvariantCulture)));

        }
    }
}
