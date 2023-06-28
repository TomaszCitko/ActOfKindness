using System.Security.Claims;
using API.Services;
using Application.Dtos.User;
using Domain.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly TokenService _tokenService;

        public AccountController(UserManager<AppUser> userManager,RoleManager<IdentityRole> roleManager, TokenService tokenService)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _tokenService = tokenService;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto login)
        {
            var user = await _userManager.FindByEmailAsync(login.email);
            if (user == null) return Unauthorized();

            var result = await _userManager.CheckPasswordAsync(user, login.password);
            if (result)
            {
                // sending to frontend our user with token for future authorization
                return CreateUserDto(user);
            }
            return Unauthorized();
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            // check if we already have same email
            if (await _userManager.Users.AnyAsync(u=>u.Email == registerDto.Email))
            {
                ModelState.AddModelError("email", "Email already taken");
                return ValidationProblem();
            }    
            
            if (await _userManager.Users.AnyAsync(u=>u.UserName == registerDto.Username))
            {
                ModelState.AddModelError("username", "Username already taken");
                return ValidationProblem();
            }            


            // create identity user
            var newUser = new AppUser
            {
                UserName = registerDto.Username,
                Location = registerDto.Location,
                Email = registerDto.Email,
                EmailConfirmed = true,

            };
            // add user to db
            var result = await _userManager.CreateAsync(newUser, registerDto.Password);
            // assign role
            await _userManager.AddToRoleAsync(newUser, "User");

            // sending to frontend our user with token for future authorization
            if (result.Succeeded)
            {
                return CreateUserDto(newUser);
            }
            return BadRequest(result.Errors);
        }

        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var emailValue = User.FindFirstValue(ClaimTypes.Email);
            if (emailValue is null) return BadRequest();

            var user = await _userManager.FindByEmailAsync(emailValue);
            return CreateUserDto(user);
        }

        private UserDto CreateUserDto(AppUser user)
        {
            return new UserDto
            {
                Location = user.Location,
                Username = user.UserName,
                Token = _tokenService.CreateToken(user),
            };
        }
    }
}
