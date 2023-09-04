using API.Middleware;
using API.Services;
using Application.Dtos.Photo;
using Application.Interfaces;
using Microsoft.Extensions.DependencyInjection;
using Persistence.Repositories;

namespace API.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static void AddApi(this IServiceCollection services, IConfiguration config)
        {
            services.AddScoped<ErrorHandlingMiddleware>();
            services.AddScoped<IContextService, ContextService>();
            services.AddHttpContextAccessor();
            services.Configure<CloudinarySetup>(config.GetSection("Cloudinary"));

        }
    }
}