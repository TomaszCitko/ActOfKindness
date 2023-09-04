namespace Application.Dtos.Event
{
    public record PaginatedResults<T>(T Items, int PageNumber, int TotalPages);
}
