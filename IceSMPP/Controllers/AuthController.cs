using System.Security.Claims;
using IceSMPP.Entity.Auth;
using InertiaCore;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;

namespace IceSMPP.Controllers;

[Route("auth/[action]")]
public class AuthController : Controller
{
    [HttpGet]
    public Task<Response> Login()
    {
        return Task.FromResult(Inertia.Render("Auth/Login"));
    }

    [HttpPost]
    public async Task<IActionResult> Login([FromBody] LoginEntity login)
    {
        if (login.Identity == "admin" && login.Password == "admin")
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, login.Identity),
                // Add other claims as necessary
            };
            var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
            var claimsPrincipal = new ClaimsPrincipal(claimsIdentity);
            await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, claimsPrincipal);
           return Inertia.Location("/");
        }

        return Inertia.Render("Auth/Login");
    }

    [HttpPost]
    public async Task<IActionResult> Logout()
    {
        await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
        return Inertia.Location("/");
    }

    public async Task<IActionResult> Profile()
    {
        return Inertia.Render("Profile/Edit");
    }
}