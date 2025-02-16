using InertiaCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace IceSMPP.Controllers.Phonebook;
[Route("Phonebook/Blacklists/[action]")]
[Authorize]
public class Blacklists:Controller
{
    public async Task<IActionResult> Index()
    {
        return Inertia.Render("Phonebook/Blacklists/Index");
    }
}