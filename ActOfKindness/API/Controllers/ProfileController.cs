using Application.Dtos.Profile;
using Application.Dtos.User;
using Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class ProfileController : ControllerBase
    {
        private readonly IProfileService _profileService;

        public ProfileController(IProfileService profileService)
        {
            _profileService = profileService;
        }

        [HttpGet("{username}")]
        public async Task<ActionResult<ProfileDto>> GetProfileAsync(string username)
        {
            return await _profileService.GetProfileDtoAsync(username) ?? throw new InvalidOperationException();
        }
    }
}
