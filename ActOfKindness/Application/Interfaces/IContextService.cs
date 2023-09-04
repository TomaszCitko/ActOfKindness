using System.Security.Claims;

namespace Application.Interfaces
{
    public interface IContextService
    {
        ClaimsPrincipal? User { get; }
        string? GetUserId { get; }
        string? GetUserRole { get; }
        string Method { get; }
    }
}
