using System.Security.Claims;
using API.Services;
using Application.Dtos.User;
using AutoMapper;
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
        private readonly TokenService _tokenService;
        private readonly IMapper _mapper;

        public AccountController(UserManager<AppUser> userManager, TokenService tokenService,IMapper mapper)
        {
            _userManager = userManager;
            _tokenService = tokenService;
            _mapper = mapper;
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
                return await CreateUserDto(user);
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
                return await CreateUserDto(newUser);
            }
            return BadRequest(result.Errors);
        }

        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var emailValue = User.FindFirstValue(ClaimTypes.Email);
            if (emailValue is null) return BadRequest();

            var user = await _userManager.Users.Include(x => x.Photos).FirstOrDefaultAsync(u => u.Email == emailValue);
            if (user != null) return await CreateUserDto(user);
            return BadRequest();
        }

        private async Task<UserDto> CreateUserDto(AppUser user)
        {
            var roles = await _userManager.GetRolesAsync(user);
            var role = roles.FirstOrDefault();
            var mapped = _mapper.Map<UserDto>(user);
            mapped.Token = _tokenService.CreateToken(user, role);

            return mapped;
        }
    }
}
