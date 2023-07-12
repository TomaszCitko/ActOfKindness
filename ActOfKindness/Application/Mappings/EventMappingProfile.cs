using Application.Dtos.Event;
using Application.Dtos.Profile;
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

        }
    }
}
