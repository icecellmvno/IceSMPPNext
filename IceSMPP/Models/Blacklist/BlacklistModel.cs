namespace IceSMPP.Models.Phonebook.Blacklist;

public class BlacklistModel
{
    public Int64 Id { get; set; }
    public Int64 TenantId { get; set; }
    public string? src_number { get; set; } = "*";
    public string dst_number { get; set; }
    public string? reason { get; set; }
    public DateTime created_at { get; set; }
    public DateTime? updated_at { get; set; }
    public DateTime? deleted_at { get; set; }
    
}