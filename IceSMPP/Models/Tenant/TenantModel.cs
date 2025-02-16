using IceSMPP.Models.Auth;

namespace IceSMPP.Models.Tenant;

public class TenantModel
{

    public int Id { get; set; } // Tenant's unique ID
    public string Title { get; set; } // Tenant's name
    public string? Logo { get; set; } // Tenant's logo
    public string? Favicon { get; set; } // Tenant's favicon
    public DateTime CreationDate { get; set; } // Creation date
    public TenantType Type { get; set; } // Tenant type
    // New fields
    public string CustomerType { get; set; } // MUSTERI_TIPI
    public DateTime SubscriptionStart { get; set; } // ABONE_BASLANGIC
    public DateTime SubscriptionEnd { get; set; } // ABONE_BITIS
    public TenantSubscriberInfo Info { get; set; } // Subscriber identity information
    public List<TenantAddress> Addresses { get; set; } // List of addresses
    public TenantSubscriberIdentityType IdentityType { get; set; } // Subscriber identity type
    public virtual ICollection<ApplicationUser> Users { get; set; }
    public virtual ICollection<ApplicationRole> Roles { get; set; }
    public UInt64 SMS_Credit { get; set; } // SMS Credit
    public Decimal Balance { get; set; } // Balance
    public Decimal CreditLimit { get; set; } // Credit limit
    public bool Postpaid { get; set; } // Postpaid
    public CustomerStatus Status { get; set; } // Customer status
    
}


