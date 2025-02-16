using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace IceSMPP.Entity.Auth;

public class LoginEntity
{
    [Required]

    public string Identity { get; set; }
    [Required]

    public string Password { get; set; }
}