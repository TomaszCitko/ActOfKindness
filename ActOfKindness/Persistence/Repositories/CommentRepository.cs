using Application.Dtos.Event;
using Application.Interfaces;
using Domain.Models;
using Microsoft.AspNetCore.Identity;

namespace Persistence.Repositories;

public class CommentRepository : ICommentRepository
{
    private readonly IEventRepository _eventRepository;
    private readonly IContextService _contextService;
    private readonly UserManager<AppUser> _userManager;
    private readonly ApplicationDbContext _dbContext;

    public CommentRepository(IEventRepository eventRepository, IContextService contextService, UserManager<AppUser> userManager, ApplicationDbContext dbContext)
    {
        _eventRepository = eventRepository;
        _contextService = contextService;
        _userManager = userManager;
        _dbContext = dbContext;
    }
    public async Task<CommentDto> CreateCommentAsync(Guid eventId, string commentBody)
    {
        var eventToAddComment = await _eventRepository.GetEventByIdForComments(eventId);
        var userId = _contextService.GetUserId;
        if (userId is not null)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (eventToAddComment is not null && user is not null)
            {
                var newComment = new Comment
                {
                    Author = user,
                    Body = commentBody,
                    Event = eventToAddComment,
                };

                eventToAddComment.Comments.Add(newComment);
                if (SaveAsync().Result)
                {
                    return CreateCommentDto(newComment);
                }
            }
        }
        throw new Exception("cannot add comment");
    }

    public async Task<List<CommentDto>> ListCommentsAsync(Guid eventId)
    {
        var eventToGetCommentsFrom = await _eventRepository.GetEventByIdForComments(eventId);

        var listOfCommentsDto = eventToGetCommentsFrom?.Comments
            .Select(CreateCommentDto)
            .OrderBy(c=>c.CreatedAt)
            .ToList();

        if (listOfCommentsDto is not null)
        {
            return listOfCommentsDto;
        }

        return new List<CommentDto>();
    }

    public CommentDto CreateCommentDto(Comment comment)
    {
        if (comment != null)
            return new CommentDto(comment.Id, comment.CreatedAt, comment.Body, comment.Author.UserName,
                comment.Author.Nickname, "https://api.multiavatar.com/Binx Bond.png");

        return null;
    }

    public async Task<bool> SaveAsync()
    {
        var result = await _dbContext.SaveChangesAsync() > 0;
        return result;
    }
}