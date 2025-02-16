using Microsoft.AspNetCore.Identity;

using System.ComponentModel.DataAnnotations;

public class UserModel : IdentityUser
{
    [Required]
    public string FirstName { get; set; }
    
    [Required]
    public string LastName { get; set; }
    
    [Required]
    [EmailAddress]
    public override string Email { get; set; }
    
    // 2FA Properties
    public bool TwoFactorEnabled { get; set; }
    public string TwoFactorType { get; set; } // "Google", "SMS", "Email"
    public string AuthenticatorKey { get; set; }
    public DateTime? AuthenticatorKeyCreatedAt { get; set; }
    public bool HasAuthenticatorKey => !string.IsNullOrEmpty(AuthenticatorKey);
    
    // Recovery Codes
    public List<string> RecoveryCodes { get; set; }
    
    // Phone number verification for SMS 2FA
    public bool PhoneNumberConfirmed { get; set; }
    public string PhoneNumber { get; set; }
    
   
}
