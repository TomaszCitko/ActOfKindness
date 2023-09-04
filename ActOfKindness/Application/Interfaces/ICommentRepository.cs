using Application.Dtos.Event;
using Domain.Models;

namespace Application.Interfaces;

public interface ICommentRepository
{
    Task<CommentDto> CreateCommentAsync(Guid eventId, string commentBody);
    Task<List<CommentDto>> ListCommentsAsync(Guid eventId);
}