using System.Security.Claims;
using Application.Interfaces;

namespace API.Services
{
    public class UserContextService : IUserContextService
    {
        private readonly IHttpContextAccessor _contextAccessor;

        public UserContextService(IHttpContextAccessor contextAccessor)
        {
            _contextAccessor = contextAccessor;
        }

        public ClaimsPrincipal? User => _contextAccessor.HttpContext?.User;
        public string? GetUserId => User?.FindFirst(c => c.Type == ClaimTypes.NameIdentifier).Value;
        public string? GetUserRole => User?.FindFirst(c => c.Type == ClaimTypes.Role).Value;
    }
}
