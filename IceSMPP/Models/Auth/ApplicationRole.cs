using Microsoft.AspNetCore.Identity;

namespace IceSMPP.Models.Auth;

public class ApplicationRole : IdentityRole
{
    public string Description { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public ApplicationRole() : base()
    {
    }

    public ApplicationRole(string roleName) : base(roleName)
    {
    }
}
