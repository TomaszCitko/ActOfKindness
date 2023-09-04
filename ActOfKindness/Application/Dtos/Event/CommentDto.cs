namespace Application.Dtos.Event;

public record CommentDto(int Id, DateTime CreatedAt, string Body, string? Username, string? DisplayName, string Avatar);