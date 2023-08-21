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
                .ForMember(dest => dest.CreatedBy, opt => opt.MapFrom(src => src.CreatedBy));

            CreateMap<AppUser, UserEventDto>();

            CreateMap<AppUser, ProfileDto>()
                .ForMember(d => d.MainPhotoUrl, o => o
                    .MapFrom(s => s.Photos
                        .FirstOrDefault(x => x.IsMain).Url));

            CreateMap<AppUser, UserDto>()
                .ForMember(d => d.MainPhotoUrl, o => o
                    .MapFrom(s => s.Photos
                        .FirstOrDefault(x => x.IsMain).Url))
                .ForMember(dest => dest.Role, opt => opt.Ignore())
                .ForMember(dest => dest.Token, opt => opt.Ignore());

            CreateMap<CreateEventDto, Event>()
                .ForMember(dest => dest.StartingDate, opt => opt.MapFrom(src => DateTime.ParseExact(src.StartingDate, "dd/MM/yyyy", CultureInfo.InvariantCulture)))
                .ForMember(dest => dest.EndingDate, opt => opt.MapFrom(src => DateTime.ParseExact(src.EndingDate, "dd/MM/yyyy", CultureInfo.InvariantCulture)))
                .ForMember(dest => dest.UserId, opt => opt.Ignore())
                .ForMember(dest => dest.CreatedBy, opt => opt.Ignore())
                .ForMember(dest => dest.IsDone, opt => opt.Ignore())
                .ForMember(dest => dest.CreatedTime, opt => opt.Ignore())
                .ForMember(dest => dest.IsModerated, opt => opt.Ignore())
                .ForMember(dest => dest.Participants, opt => opt.Ignore())
                .ForMember(dest => dest.Comments, opt => opt.Ignore())
                .ForMember(dest => dest.Photos, opt => opt.Ignore());

        }
    }
}