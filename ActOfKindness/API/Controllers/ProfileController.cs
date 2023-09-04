using Application.Dtos.Profile;
using Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("/api/[controller]/{username}")]
    public class ProfileController : ControllerBase
    {
        private readonly IProfileService _profileService;

        public ProfileController(IProfileService profileService)
        {
            _profileService = profileService;
        }

        [AllowAnonymous]
        [HttpGet("")]
        public async Task<ActionResult<ProfileDto>> GetProfileAsync(string username)
        {
            return await _profileService.GetProfileDtoAsync(username) ?? throw new InvalidOperationException();
        }
        [HttpPut("")]
        public async Task<ActionResult<ProfileDto>> UpdateProfileAsync(string username,
            [FromBody] ProfileUpdateDto updateDto)
        {
            return await _profileService.UpdateProfileDtoAsync(username, updateDto) ?? throw new InvalidOperationException();
        }
        
        
    }
}
