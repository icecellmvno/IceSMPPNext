namespace IceSMPP.Models.Tenant;

public class TenantAddress
{
    public Int64 Id { get; set; } // ABONE_ADRES_ID
    public TenantModel Tenant { get; set; } // Tenant
    public string Country { get; set; } // Ülke
    public string Province { get; set; } // ABONE_ADRES_TESIS_IL
    public string District { get; set; } // ABONE_ADRES_TESIS_ILCE
    public string Neighborhood { get; set; } // ABONE_ADRES_TESIS_MAHALLE
    public string Street { get; set; } // ABONE_ADRES_TESIS_CADDE
    public string ExternalDoorNo { get; set; } // ABONE_ADRES_TESIS_DIS_KAPI_NO
    public string InternalDoorNo { get; set; } // ABONE_ADRES_TESIS_IC_KAPI_NO
    public string PostalCode { get; set; } // ABONE_ADRES_TESIS_POSTA_KODU
    public string AddressCode { get; set; } // ABONE_ADRES_TESIS_ADRES_KODU
    public string AddressType { get; set; } // ABONE_ADRES_TESIS_ADRES_TIPI
    public string Email { get; set; } // ABONE_ADRES_E_MAIL
    public string ContactPhoneNo1 { get; set; } // ABONE_ADRES_IRTIBAT_TEL_NO_1
    public string ContactPhoneNo2 { get; set; } // ABONE_ADRES_IRTIBAT_TEL_NO_2
    public string MobilePhone { get; set; } // Cep telefonu
    public string Fax { get; set; } // Faks
}