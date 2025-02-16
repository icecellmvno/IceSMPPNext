using InertiaCore;

namespace IceSMPP.Middlewares;

public class SharedDataMiddleware
{
    private readonly RequestDelegate _next;
 

    public SharedDataMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task Invoke(HttpContext context)
    {
        var auth = new { user = new {name="tarik",type="user"} };// Replace with actual logic
        Inertia.Share("auth", auth);
        

        await _next(context);
    }
}