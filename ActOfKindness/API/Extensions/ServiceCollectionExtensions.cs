using API.Middleware;
using API.Services;
using Application.Interfaces;
using Persistence.Repositories;

namespace API.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static void AddApi(this IServiceCollection services)
        {
            services.AddScoped<ErrorHandlingMiddleware>();
            services.AddScoped<IContextService, ContextService>();
            services.AddHttpContextAccessor();

        }
    }
}