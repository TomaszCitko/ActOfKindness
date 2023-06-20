using Domain;
using Domain.Dtos.User;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public AccountController(UserManager<AppUser> userManager,RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto login)
        {
            var user = await _userManager.FindByEmailAsync(login.email);
            if (user == null) return Unauthorized();

            var result = await _userManager.CheckPasswordAsync(user, login.password);
            if (result)
            {
                return new UserDto
                {
                    DisplayName = user.Nickname,
                    Token = "json token",
                    UserName = user.UserName,
                };
            }

            return Unauthorized();
        }
    }
}
