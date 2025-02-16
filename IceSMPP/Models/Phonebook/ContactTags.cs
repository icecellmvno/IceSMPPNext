namespace IceSMPP.Models.Phonebook;

public class ContactTags {
    public Int64 Id { get; set; }
    public Int64 TenantId { get; set; }
    public string TagName { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public DateTime? UpdatedAt { get; set; }
    public DateTime? DeletedAt { get; set; }
}