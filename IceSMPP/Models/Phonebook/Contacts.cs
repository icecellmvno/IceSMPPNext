using System.ComponentModel.DataAnnotations;

namespace IceSMPP.Models.Phonebook;

public class Contacts
{
    public Int64 Id { get; set; }
    public Int64 TenantId { get; set; }
    public Int64 GroupId { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    [Required]
    public string PhoneNumber { get; set; }
    public string? Email { get; set; }
    public string? Company { get; set; }
    public List<ContactsCustomFields> CustomFields { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public DateTime? UpdatedAt { get; set; }
    public DateTime? DeletedAt { get; set; }
    
    
    
}