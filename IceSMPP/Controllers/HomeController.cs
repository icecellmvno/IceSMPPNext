using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using IceSMPP.Models;
using InertiaCore;
using Microsoft.AspNetCore.Authorization;

namespace IceSMPP.Controllers;

[Authorize]
public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;

    public HomeController(ILogger<HomeController> logger)
    {
        _logger = logger;
    }

    public Task<Response> Index()
    {
    

        return Task.FromResult(Inertia.Render("Dashboard"));
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}