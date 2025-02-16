namespace IceSMPP.Models.Tenant;

public class TenantSubscriberIdentityType
{
    public Int64 Id { get; set; } // ABONE_KIMLIK_TIPI_ID
    public Int64 TenantId { get; set; }// Tenant
    public string IdentityType { get; set; } // ABONE_KIMLIK_TIPI
    public string? IdentityVolumeNo { get; set; } // ABONE_KIMLIK_CILT_NO
    public string? IdentityRegistryNo { get; set; } // ABONE_KIMLIK_KUTUK_NO
    public string? IdentityPageNo { get; set; } // ABONE_KIMLIK_SAYFA_NO
    public string? IdentityProvince { get; set; } // ABONE_KIMLIK_IL
    public string? IdentityDistrict { get; set; } // ABONE_KIMLIK_ILCE
    public string? IdentityNeighborhoodVillage { get; set; } // ABONE_KIMLIK_MAHALLE_KOY
    public string IdentitySerialNo { get; set; } // ABONE_KIMLIK_SERİ_NO
    public string? IdentityIssuedPlace { get; set; } // ABONE_KIMLIK_VERILDIGI_YER
    public DateTime IdentityIssuedDate { get; set; } // ABONE_KIMLIK_VERILDIGI_TARIH
    public string? IdentityAffiliation { get; set; } // ABONE_KIMLIK_AIDIYETI
}