using System.Security.Claims;
using IceSMPP.Data;
using IceSMPP.Entity.Auth;
using IceSMPP.Models.Auth;
using InertiaCore;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace IceSMPP.Controllers;

[Route("auth/[action]")]
public class AuthController : Controller
{
    
    private ApplicationDbContext _context;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly SignInManager<ApplicationUser> _signInManager;
    private readonly RoleManager<ApplicationRole> _roleManager;
    public AuthController(
        UserManager<ApplicationUser> userManager,
        SignInManager<ApplicationUser> signInManager,
        RoleManager<ApplicationRole> roleManager,
        ApplicationDbContext context)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _roleManager = roleManager;
        _context = context;
    }

    
    [HttpGet]
    public Task<Response> Login()
    {
        return Task.FromResult(Inertia.Render("Auth/Login"));
    }
    [HttpPost]
    public async Task<IActionResult> Login([FromBody] LoginEntity login)
    {
        if (string.IsNullOrEmpty(login.Identity) || string.IsNullOrEmpty(login.Password))
        {
            return Inertia.Render("Auth/Login", new
            {
                errors = new Dictionary<string, string>
                {
                    { "Identity", string.IsNullOrEmpty(login.Identity) ? "Please enter your username." : null },
                    { "Password", string.IsNullOrEmpty(login.Password) ? "Please enter your password." : null }
                }.Where(x => x.Value != null).ToDictionary(x => x.Key, x => x.Value)
            });
        }

        var user = await _userManager.FindByNameAsync(login.Identity) ??
                   await _userManager.FindByEmailAsync(login.Identity);

        if (user == null || !user.IsActive)
        {
            return Inertia.Render("Auth/Login", new
            {
                errors = new Dictionary<string, string>
                {
                    { "message", "Invalid username or password" }
                }
            });
        }

        var result = await _signInManager.PasswordSignInAsync(user.UserName, login.Password, login.RememberMe, lockoutOnFailure: true);
    
        if (result.Succeeded)
        {
            user.LastLoginAt = DateTime.UtcNow;
            await _userManager.UpdateAsync(user);
            return Inertia.Location("/");
        }

        if (result.IsLockedOut)
        {
            return Inertia.Render("Auth/Login", new
            {
                errors = new Dictionary<string, string>
                {
                    { "message", "Account is locked." }
                }
            });
        }

        return Inertia.Render("Auth/Login", new
        {
            errors = new Dictionary<string, string>
            {
                { "message", "Invalid username or password" }
            }
        });
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