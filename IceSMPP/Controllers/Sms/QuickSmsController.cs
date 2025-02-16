using InertiaCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace IceSMPP.Controllers.Sms;

[Route("Sms/Quick/[action]")]
[Authorize]
public class QuickSmsController:Controller
{
    public async Task<IActionResult> Index()
    {
        List<string> src_address = new List<string>{"deneme","deneme"};

        return Inertia.Render("Sms/Quick/Index", new {src_address});
    }
}