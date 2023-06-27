using API.Middleware;

namespace API.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static void AddApi(this IServiceCollection services)
        {
            services.AddScoped<ErrorHandlingMiddleware>();
        }
    }
}
