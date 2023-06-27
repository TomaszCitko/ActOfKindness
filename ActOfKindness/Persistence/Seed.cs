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
                    Title = "Lady Jadzia - be kind to check up on her.",
                    Localization = "Poland, Malbork",
                    Description =
                        "Lady Jadzia is an old lady, living alone in her tiny old house. She is 83 years old and can barely walk. She has no living family and daily chores can be a real challange for her. If you happen to come by and ask if she needs anything, maybe just to help her with  shopping (she cannot use Glovo) or even just for a short small talk which can brighten up her day - that could really warm her heart up.\r\n We've met her during our holiday trip (we live 500km from her) and she was honsetly delighted with our help. If you have a bit of kindness in you and want to share it, you can count on lady Jadzia's gratitude.",
                    StartingDate = new DateTime(2023, 06, 28),
                    EndingDate = new DateTime(2023, 07, 20),
                    Type = EventType.HelpNeeded,
                    IsOnline = false,
                    Image =
                        "https://thumbs.dreamstime.com/b/happy-old-lady-no-tooth-standing-middle-road-village-159464726.jpg"
                });

            await dbContext.Events.AddAsync(
                new Event()
                {
                    Id = new Guid(),
                    UserId = new Guid(),
                    Title = "Cleaning Augustow forest",
                    Localization = "Poland, Augustów",
                    Description =
                        "We invite you to join us in cleaning Augustow forests from all the trash left by the tourists or irresponsible locals. Our last action was a big success - almost all trails were completely wiped out from non-organic matter!",
                    StartingDate = new DateTime(2023, 07, 28),
                    EndingDate = new DateTime(2023, 07, 28),
                    Type = EventType.HelpNeeded,
                    IsOnline = false,
                    Image =
                        "https://news.acropolis.org/wp-content/uploads/2015/10/picture16.jpg"
                });

            await dbContext.Events.AddAsync(
                new Event()
                {
                    Id = new Guid(),
                    UserId = new Guid(),
                    Title = "English webinar - A1/A2 level",
                    Localization = "Online",
                    Description =
                        "I can help anyone to start learning English completely for free. Please join my regularly scheduled webinars and I'll do my best to decompose all the rules of this language to easily chunkable bits.",
                    StartingDate = new DateTime(2023, 08, 4),
                    EndingDate = new DateTime(2023, 08, 4),
                    Type = EventType.HelpOffer,
                    IsOnline = true,
                    Image =
                        "https://www.aeccglobal.com.au/images/easyblog_articles/253/6c20e7aa911029bd46c6de7bc83cff7d-1.webp"
                });


            await dbContext.Events.AddAsync(
                new Event()
                {
                    Id = new Guid(),
                    UserId = new Guid(),
                    Title = "Lady Lodzia tries to survive from knitting and can use your support",
                    Localization = "Szczecin",
                    Description =
                        "She doesn't want anything for free, so maybe you can find a nice pair of socks or a cap for yourself",
                    StartingDate = new DateTime(2023, 07, 4),
                    EndingDate = new DateTime(2023, 08, 4),
                    Type = EventType.HelpNeeded,
                    IsOnline = false,
                    Image =
                        "https://img2.dmty.pl//uploads/202211/1667257621_asdbs4_600.jpg"
                });

            await dbContext.Events.AddAsync(
                new Event()
                {
                    Id = new Guid(),
                    UserId = new Guid(),
                    Title = "Old lady needs some support",
                    Localization = "Gliwice",
                    Description =
                        "You can find her every day by the bus station and she doesn't want anything for free. If you happen to be near by, please feel free to buy her self-made bread or żurek soup in a jar.",
                    StartingDate = new DateTime(2023, 07, 4),
                    EndingDate = new DateTime(2023, 08, 4),
                    Type = EventType.HelpNeeded,
                    IsOnline = false,
                    Image =
                        "https://img32.dmty.pl//uploads/202107/1627296241_1gbpll_600.jpg"
                });

            await dbContext.Events.AddAsync(
                new Event()
                {
                    Id = new Guid(),
                    UserId = new Guid(),
                    Title = "Fardin cannot go back home",
                    Localization = "Częstochowa",
                    Description =
                        "Fardin Kazemi's truck got completely broken and he cannot go home to Iran. We need someone with good mechanical knowledge to help us fix his vehicle and help him reunite with his family.",
                    StartingDate = new DateTime(2023, 07, 4),
                    EndingDate = new DateTime(2023, 08, 4),
                    Type = EventType.HelpNeeded,
                    IsOnline = false,
                    Image =
                        "https://ocdn.eu/pulscms-transforms/1/P6rk9kpTURBXy9kYzlmZmE4M2VkZjNiNDc2ZTk0MGE3NjdkNDMyNmFhMS5qcGeSlQMAzNTNCADNBICTBc0C-M0BrN4AAqEwBaExAA"
                });

            await dbContext.Events.AddAsync(
                new Event()
                {
                    Id = new Guid(),
                    UserId = new Guid(),
                    Title = "If you're going through tough time - keep going!",
                    Localization = "Online",
                    Description =
                        "Everyone has a time of doubt and loneliness sometimes. If you're feeling down and need someone to talk-it-through, please feel free to contact me. We are in this together. You are not alone.",
                    StartingDate = new DateTime(2023, 07, 6),
                    EndingDate = new DateTime(2023, 09, 4),
                    Type = EventType.HelpOffer,
                    IsOnline = true,
                    Image =
                        "https://img3.dmty.pl//uploads/201406/1401744836_rkuq1w_600.jpg"
                });



            await dbContext.Events.AddAsync(
                new Event()
                {
                    Id = new Guid(),
                    UserId = new Guid(),
                    Title = "Free apples!",
                    Localization = "Grudziądz",
                    Description =
                        "Well, maybe it's not a big help, but at least you can get few additional vitamins and a healthy fiber. :) My apple trees gave me too many apples this year, so please feel free to take some with you! Enjoy and remember - an apple a day keeps the doctor away!",
                    StartingDate = new DateTime(2023, 07, 14),
                    EndingDate = new DateTime(2023, 08, 1),
                    Type = EventType.HelpNeeded,
                    IsOnline = false,
                    Image =
                        "https://pbs.twimg.com/media/D8NIP0NU8AAi8Fz.jpg"
                });

            await dbContext.Events.AddAsync(
                new Event()
                {
                    Id = new Guid(),
                    UserId = new Guid(),
                    Title = "First aid course for everyone",
                    Localization = "Warszawa",
                    Description =
                        "You never know when you are gonna need it, but when the time comes - you'll be glad to know what to do. I offer completely free first aid training for anyone interested! Please join us on 17th of July in Warsaw, Helping street 17.",
                    StartingDate = new DateTime(2023, 07, 17),
                    EndingDate = new DateTime(2023, 07, 17),
                    Type = EventType.HelpOffer,
                    IsOnline = false,
                    Image =
                        "https://www.alertmedia.com/wp-content/uploads/2022/06/Blog-FirstAid-Training-v2-1024x536.jpg"
                });

            await dbContext.Events.AddAsync(new Event()
            {
                Id = new Guid(),
                UserId = new Guid(),
                Title = "Need a second pair of hands",
                Localization = "Poland, Oświęcim",
                Description =
                    "I'll have my fridge delivered on 20/07/2023, but the driver will only leave it by the door. Since my brother will be at the hospital at that time, I need someone to help me place it in the kitchen located on the 2nd floor. Beer and snacks provided! ",
                StartingDate = new DateTime(2023, 07, 20),
                EndingDate = new DateTime(2023, 07, 20),
                Type = EventType.HelpNeeded,
                IsOnline = false,
                Image = "https://i.redd.it/s77hkdaw3h471.jpg"
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
                new AppUser
                {
                    Nickname = "romek", Email = "romek@gmail.com", UserName = "romek", EmailConfirmed = true
                },
                new AppUser
                {
                    Nickname = "bronek", Email = "bronek@gmail.com", UserName = "bronek", EmailConfirmed = true
                },
                new AppUser
                {
                    Nickname = "ziomek", Email = "ziomek@gmail.com", UserName = "ziomek", EmailConfirmed = true
                },
                new AppUser
                {
                    Nickname = "mirek", Email = "mirek@gmail.com", UserName = "mirek", EmailConfirmed = true
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