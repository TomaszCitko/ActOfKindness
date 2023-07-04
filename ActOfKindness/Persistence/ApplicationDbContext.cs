using Domain.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class ApplicationDbContext : IdentityDbContext<AppUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
            
        }

        public DbSet<Event> Events { get; set; }
        public DbSet<Comment> Comments { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Event>()
                .HasOne(e => e.CreatedBy)
                .WithMany(u => u.CreatedEvents)
                .HasForeignKey(u => u.UserId);

            builder.Entity<EventUser>()
                .HasKey(eu => new { eu.UserId, eu.EventId });

            builder.Entity<EventUser>()
                .HasOne(eu => eu.Event)
                .WithMany(e => e.Participants)
                .HasForeignKey(eu => eu.EventId)
                .OnDelete(DeleteBehavior.ClientNoAction);

            builder.Entity<EventUser>()
                .HasOne(eu => eu.User)
                .WithMany(u => u.ParticipatedEvents)
                .HasForeignKey(eu => eu.UserId)
                .OnDelete(DeleteBehavior.ClientNoAction);

            builder.Entity<Comment>()
                .HasOne(e => e.Event)
                .WithMany(c => c.Comments)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
