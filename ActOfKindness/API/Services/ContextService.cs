using System.Security.Claims;
using Application.Interfaces;

namespace API.Services
{
    public class ContextService : IContextService
    {
        private readonly IHttpContextAccessor _contextAccessor;

        public ContextService(IHttpContextAccessor contextAccessor)
        {
            _contextAccessor = contextAccessor;
        }

        public string Method => _contextAccessor.HttpContext.Request.Method;
        public ClaimsPrincipal? User => _contextAccessor.HttpContext?.User;
        public string? GetUserId => User?.FindFirst(c => c.Type == ClaimTypes.NameIdentifier).Value;
        public string? GetUserRole => User?.FindFirst(c => c.Type == ClaimTypes.Role).Value;        

    }
}
