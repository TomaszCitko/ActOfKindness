using System.Security.Claims;

namespace Application.Interfaces
{
    public interface IUserContextService
    {
        ClaimsPrincipal? User { get; }
        string? GetUserId { get; }
        string? GetUserRole { get; }
    }
}
