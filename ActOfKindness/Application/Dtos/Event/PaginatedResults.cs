namespace Application.Dtos.Event
{
    public class PaginatedResults<T>
    {
        public T Items { get; set; }
        public int PageNumber { get; set; }
        public int TotalItems { get; set; }
        public int TotalPages { get; set; }
    }
}
