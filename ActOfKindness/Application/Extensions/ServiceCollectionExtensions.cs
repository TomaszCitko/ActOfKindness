using Application.Services;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;
using Application.Interfaces;

namespace Application.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static void AddApplication(this IServiceCollection services)
        {
            services.AddScoped<IEventService, EventService>();
            services.AddScoped<IPhotoService, PhotoService>();
            services.AddScoped<IProfileService, ProfileService>();
            services.AddAutoMapper(Assembly.GetExecutingAssembly());
        }
    }
}
