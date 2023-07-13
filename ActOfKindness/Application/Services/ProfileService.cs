using Application.Dtos.User;
using Application.Interfaces;
using Domain.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using Application.Dtos.Profile;
using AutoMapper;

namespace Application.Services;

public class ProfileService : IProfileService
{
    private readonly IContextService _contextService;
    private readonly UserManager<AppUser> _userManager;
    private readonly IMapper _mapper;

    public ProfileService(IContextService contextService, UserManager<AppUser> userManager,IMapper mapper)
    {
        _contextService = contextService;
        _userManager = userManager;
        _mapper = mapper;
    }
    public async Task<ProfileDto?> GetProfileDtoAsync(string username)
    {
        var user = await _userManager.Users
            .Include(x=>x.Photos)
            .FirstOrDefaultAsync(u=>u.UserName == username);
        return user is not null ? _mapper.Map<ProfileDto>(user) : null;

    }
}