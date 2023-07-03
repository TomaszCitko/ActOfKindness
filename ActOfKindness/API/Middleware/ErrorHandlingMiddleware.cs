using System.Net;
using Application.Exceptions;
using Serilog;

namespace API.Middleware
{
    public class ErrorHandlingMiddleware : IMiddleware
    {
        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            try
            {
                await next.Invoke(context);
            }
            catch (NotFoundException notFoundException)
            {
                Log.Warning($"User Id = {notFoundException.UserId} | User Role = {notFoundException.UserRole} | [{notFoundException.Method}] | Action = {notFoundException.Message}");

                context.Response.StatusCode = (int)HttpStatusCode.NotFound;
                await context.Response.WriteAsync(notFoundException.Message);
            }
            catch (BadRequestException badRequestException)
            {
                Log.Error($"User Id = {badRequestException.UserId} | User Role = {badRequestException.UserRole} | [{badRequestException.Method}] | Action = {badRequestException.Message}");

                context.Response.StatusCode = (int)HttpStatusCode.BadRequest;
                await context.Response.WriteAsync(badRequestException.Message);
            }
            catch (ForbidException forbidException)
            {
                Log.Warning($"User Id = {forbidException.UserId} | User Role = {forbidException.UserRole} | [{forbidException.Method}] | Action = {forbidException.Message}");

                context.Response.StatusCode = (int)HttpStatusCode.Forbidden;
                await context.Response.WriteAsync(forbidException.Message);
            }
            catch (Exception exception)
            {
                Log.Fatal($"Exception {exception}");

                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                await context.Response.WriteAsync($"Something went wrong | {exception.Message}");
            }
        }
    }
}
