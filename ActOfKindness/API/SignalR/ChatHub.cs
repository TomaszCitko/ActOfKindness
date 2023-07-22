using Application.Interfaces;
using Microsoft.AspNetCore.SignalR;

namespace API.SignalR;

public class ChatHub : Hub
{
    private readonly ICommentRepository _commentRepository;

    public ChatHub(ICommentRepository commentRepository)
    {
        _commentRepository = commentRepository;
    }

    public async Task SendComment(Guid eventId, string message)
    {
        var comment = await _commentRepository.CreateCommentAsync(eventId, message);

        await Clients.Group(eventId.ToString())
            .SendAsync("ReceiveCommentAfterCreatingOne", comment);
    }
    
    public override async Task OnConnectedAsync()
    {
        var httpContext = Context.GetHttpContext();
        var eventIdString = httpContext.Request.Query["eventId"];
        await Groups.AddToGroupAsync(Context.ConnectionId, eventIdString);
        var result = await _commentRepository.ListCommentsAsync(Guid.Parse(eventIdString));
        await Clients.Caller.SendAsync("GetAllComments", result);
    }
}