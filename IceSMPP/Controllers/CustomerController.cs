using InertiaCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace IceSMPP.Controllers;

[Route("customers/[action]")]
[Authorize]
public class CustomerController:Controller
{
    public Task<Response> Index()
    {
    

        return Task.FromResult(Inertia.Render("Customers/Index"));
    }
    public Task<Response> Create()
    {
    

        return Task.FromResult(Inertia.Render("Customers/Create"));
    }
    public Task<Response> Show()
    {
    

        return Task.FromResult(Inertia.Render("Customers/Show"));
    }
    
}