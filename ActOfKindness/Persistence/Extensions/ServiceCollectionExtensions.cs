using Application.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Persistence.Repositories;

namespace Persistence.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static void AddPersistence(this IServiceCollection service, IConfiguration configuration)
        {
            service.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(configuration.GetConnectionString("ActOfKindness")));
            service.AddScoped<IEventRepository, EventRepository>();
            service.AddScoped<ICommentRepository, CommentRepository>();
            service.AddScoped<IPhotoRepository, PhotoRepository>();
        }
    }
}
