using Domain.Models;
using Microsoft.AspNetCore.Identity;

namespace Persistence;

public static class Seed
{
    public static async Task SeedEvents(ApplicationDbContext dbContext)
    {
        if (dbContext.Events.Count() < 2)
        {
            await dbContext.Events.AddAsync(
                new Event()
                {
                    Id = new Guid(),
                    UserId = new Guid(),
                    Title = "Test Title",
                    Description =
                        "Assum vulputate rebum ea et. Autem aliquip erat luptatum labore dolores feugait amet amet molestie duis rebum assum delenit eum nonumy aliquyam diam. Nonummy duis sanctus justo.Elitr ut amet volutpat minim stet duo duo esse. Est vel amet nonumy est dolores sanctus sit gubergren. Vulputate nulla sed et ea veniam invidunt at magna. In sed iriure aliquyam et duis rebum eum lorem dignissim consequat. Lorem amet nonumy diam. Esse ut te sanctus gubergren sed ea. Clita et placerat duo est diam voluptua tempor vero aliquyam sed vero magna consequat invidunt lorem gubergren. Nonumy ipsum mazim nonummy et dolore clita sea et diam. Est et diam nibh dolor stet sea sed at. Feugait ut no erat ea ipsum aliquyam ",
                    StartingDate = new DateTime(2023, 06, 20),
                    EndingDate = new DateTime(2023, 07, 02),
                    Type = 0,
                    Image =
                        "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Vue_de_nuit_de_la_Place_Stanislas_%C3%A0_Nancy.jpg/1920px-Vue_de_nuit_de_la_Place_Stanislas_%C3%A0_Nancy.jpg"
                });


            await dbContext.Events.AddAsync(new Event()
            {
                Id = new Guid(),
                UserId = new Guid(),
                Title = "Test Title",
                Description =
                    "Assum vulputate rebum ea et. Autem aliquip erat luptatum labore dolores feugait amet amet molestie duis rebum assum delenit eum nonumy aliquyam diam. Nonummy duis sanctus justo.Elitr ut amet volutpat minim stet duo duo esse. Est vel amet nonumy est dolores sanctus sit gubergren. Vulputate nulla sed et ea veniam invidunt at magna. In sed iriure aliquyam et duis rebum eum lorem dignissim consequat. Lorem amet nonumy diam. Esse ut te sanctus gubergren sed ea. Clita et placerat duo est diam voluptua tempor vero aliquyam sed vero magna consequat invidunt lorem gubergren. Nonumy ipsum mazim nonummy et dolore clita sea et diam. Est et diam nibh dolor stet sea sed at. Feugait ut no erat ea ipsum aliquyam ",
                StartingDate = new DateTime(2023, 07, 20),
                EndingDate = new DateTime(2023, 08, 02),
                Type = 0,
                Image = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Vue_de_nuit_de_la_Place_Stanislas_%C3%A0_Nancy.jpg/1920px-Vue_de_nuit_de_la_Place_Stanislas_%C3%A0_Nancy.jpg"
            });
            await dbContext.SaveChangesAsync();
        }
    }

    public static async Task SeedUsers(UserManager<AppUser> userManager, RoleManager<IdentityRole> roleManager)
    {
        var roles = new[] { "Admin", "Moderator", "User" };
        foreach (var role in roles)
        {
            if (!await roleManager.RoleExistsAsync(role))
            {
                await roleManager.CreateAsync(new IdentityRole(role));
            }
        }

        if (!userManager.Users.Any())
        {
            var users = new List<AppUser>()
            {
                new AppUser
                {
                    Nickname = "maciejj", Email = "maciekdmd90@gmail.com", UserName = "maciekdmd90",
                    EmailConfirmed = true
                },
                new AppUser
                {
                    Nickname = "aneta", Email = "shocked.frown@gmail.com", UserName = "aneta", EmailConfirmed = true
                },
                new AppUser
                {
                    Nickname = "marcin", Email = "ripek33@gmail.com", UserName = "marcin", EmailConfirmed = true
                },
                new AppUser
                {
                    Nickname = "tomek", Email = "tomek@gmail.com", UserName = "tomek", EmailConfirmed = true
                },
            };
            foreach (var user in users)
            {
                await userManager.CreateAsync(user, "ActOfKindness2023,");
                await userManager.AddToRoleAsync(user,"Admin");

            }
        }
    }
}