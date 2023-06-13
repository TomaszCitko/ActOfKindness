using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
            
        }

        public DbSet<Event> Events { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Event>()
                .HasData(new Event()
                {
                    Id = 1,
                    UserId = "1",
                    Title = "Test Title",
                    Description =
                        "Assum vulputate rebum ea et. Autem aliquip erat luptatum labore dolores feugait amet amet molestie duis rebum assum delenit eum nonumy aliquyam diam. Nonummy duis sanctus justo.Elitr ut amet volutpat minim stet duo duo esse. Est vel amet nonumy est dolores sanctus sit gubergren. Vulputate nulla sed et ea veniam invidunt at magna. In sed iriure aliquyam et duis rebum eum lorem dignissim consequat. Lorem amet nonumy diam. Esse ut te sanctus gubergren sed ea. Clita et placerat duo est diam voluptua tempor vero aliquyam sed vero magna consequat invidunt lorem gubergren. Nonumy ipsum mazim nonummy et dolore clita sea et diam. Est et diam nibh dolor stet sea sed at. Feugait ut no erat ea ipsum aliquyam ",
                    StartingDate = new DateTime(2023, 06, 20),
                    EndingDate = new DateTime(2023, 07, 02),
                    Type = 0,
                    Image = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Vue_de_nuit_de_la_Place_Stanislas_%C3%A0_Nancy.jpg/1920px-Vue_de_nuit_de_la_Place_Stanislas_%C3%A0_Nancy.jpg"
                },
                    new Event()
                    {
                        Id = 2,
                        UserId = "2",
                        Title = "Test Title",
                        Description =
                            "Assum vulputate rebum ea et. Autem aliquip erat luptatum labore dolores feugait amet amet molestie duis rebum assum delenit eum nonumy aliquyam diam. Nonummy duis sanctus justo.Elitr ut amet volutpat minim stet duo duo esse. Est vel amet nonumy est dolores sanctus sit gubergren. Vulputate nulla sed et ea veniam invidunt at magna. In sed iriure aliquyam et duis rebum eum lorem dignissim consequat. Lorem amet nonumy diam. Esse ut te sanctus gubergren sed ea. Clita et placerat duo est diam voluptua tempor vero aliquyam sed vero magna consequat invidunt lorem gubergren. Nonumy ipsum mazim nonummy et dolore clita sea et diam. Est et diam nibh dolor stet sea sed at. Feugait ut no erat ea ipsum aliquyam ",
                        StartingDate = new DateTime(2023, 07, 20),
                        EndingDate = new DateTime(2023, 08, 02),
                        Type = 0,
                        Image = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Vue_de_nuit_de_la_Place_Stanislas_%C3%A0_Nancy.jpg/1920px-Vue_de_nuit_de_la_Place_Stanislas_%C3%A0_Nancy.jpg"
                    });
        }
    }
}
