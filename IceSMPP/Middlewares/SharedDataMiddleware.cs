using InertiaCore;
using Microsoft.Extensions.Configuration;

namespace IceSMPP.Middlewares;
public class SharedDataMiddleware
{
    private readonly RequestDelegate _next;
    private readonly IConfiguration _configuration;

    public SharedDataMiddleware(RequestDelegate next, IConfiguration configuration)
    {
        _next = next;
        _configuration = configuration;
    }

    public async Task Invoke(HttpContext context)
    {
        var auth = new { user = new {name="tarik",type="user"} };
        Inertia.Share("auth", auth);
        
        var appName = Environment.GetEnvironmentVariable("applicatonName") ?? "IceSMPP";
        Inertia.Share("app", new { appName });

        await _next(context);
    }
}