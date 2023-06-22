using Domain.Models;
using Microsoft.AspNetCore.Identity;

namespace Persistence;

public static class Seed
{

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