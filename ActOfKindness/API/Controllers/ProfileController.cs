using Application.Dtos.Profile;
using Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
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

        [AllowAnonymous]
        [HttpGet("{username}")]
        public async Task<ActionResult<ProfileDto>> GetProfileAsync(string username)
        {
            return await _profileService.GetProfileDtoAsync(username) ?? throw new InvalidOperationException();
        }
    }
}
