using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace IceSMPP.Models.Auth;


public enum Application2FactorType
{
    None,
    SMS,
    Email,
    AuthenticatorApp
}

public class ApplicationUser: IdentityUser
{
    [Required]
    [StringLength(50)]
    public string FirstName { get; set; } = string.Empty;

    [Required]
    [StringLength(50)]
    public string LastName { get; set; } = string.Empty;

    [Required]
    [StringLength(50)]
    public override string UserName
    {
        get => base.UserName ?? string.Empty;
        set => base.UserName = value ?? string.Empty;
    }

    [Required]
    [EmailAddress]
    public override string Email
    {
        get => base.Email ?? string.Empty;
        set => base.Email = value ?? string.Empty;
    }

    [StringLength(100)]
    public string? CompanyName { get; set; }

    public Int64 TenantId { get; set; }
    public string? PhoneNumber { get; set; }

    public Application2FactorType TwoFactorType { get; set; }
    



    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? LastLoginAt { get; set; }
    public bool IsActive { get; set; } = true;



    // Helper property to get full name
    public string FullName => $"{FirstName} {LastName}";

}