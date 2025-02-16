using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using IceSMPP.Data;
using IceSMPP.Middlewares;
using IceSMPP.Models.Auth;
using InertiaCore;
using InertiaCore.Extensions;
using Microsoft.AspNetCore.Authentication.Cookies;
using NSwag;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var connectionString = builder.Configuration.GetConnectionString("Default") ??
                       throw new InvalidOperationException("Invalid connection string");
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(connectionString));
builder.Services.AddDatabaseDeveloperPageExceptionFilter();
builder.Services.AddInertia();
builder.Services.AddIdentity<ApplicationUser, ApplicationRole>(options => {
        // Password settings
        options.Password.RequireDigit = true;
        options.Password.RequiredLength = 6;
        options.Password.RequireNonAlphanumeric = true;
        options.Password.RequireUppercase = true;
        options.Password.RequireLowercase = true;

        // Lockout settings
        options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(30);
        options.Lockout.MaxFailedAccessAttempts = 5;
        options.Lockout.AllowedForNewUsers = true;

        // User settings
        options.User.RequireUniqueEmail = true;
        options.SignIn.RequireConfirmedEmail = true;
    })
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddDefaultTokenProviders();
builder.Services.ConfigureApplicationCookie(options =>
{
    options.Cookie.HttpOnly = true;
    options.ExpireTimeSpan = TimeSpan.FromHours(3);
    options.LoginPath = "/Auth/Login";
    options.LogoutPath = "/Auth/Logout";
    options.AccessDeniedPath = "/Auth/AccessDenied";
    
    options.SlidingExpiration = true;
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddOpenApiDocument(config =>
{
    config.Title=Environment.GetEnvironmentVariable("applicatonName") ?? "IceSMPP";
    config.Version = "v1";
    config.Description = "IceSMPP SMS Management API";
    config.ApiGroupNames = new[] {"api"};
});
builder.Services.AddControllersWithViews();
builder.Services.AddViteHelper(opt =>
{
    opt.PublicDirectory = "wwwroot";
    opt.BuildDirectory = "build";
    opt.ManifestFilename = "manifest.json";
});
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseMigrationsEndPoint();
}
else
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseRouting();
app.UseInertia();
app.UseMiddleware<SharedDataMiddleware>();
app.UseAuthorization();
app.UseOpenApi();
app.UseReDoc(configure=>configure.Path = "/api/docs");
app.MapStaticAssets();
app.MapControllers()
    .WithTags("api");
app.MapControllerRoute(
        name: "default",
        pattern: "{controller=Home}/{action=Index}/{id?}")
    .WithStaticAssets();


app.MapFallbackToFile("index.html");
app.Run();