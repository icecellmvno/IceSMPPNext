namespace IceSMPP.Models.Tenant;

public class TenantSubscriberInfo
{
    public Int64 Id { get; set; } // ABONE_ID
    public Int64 TenantId { get; set; } // Tenant
    public string Name { get; set; } // ABONE_AD
    public string Surname { get; set; } // ABONE_SOYAD
    public string Title { get; set; } // ABONE_UNVAN
    public string TaxNumber { get; set; } // ABONE_VERGI_NUMARASI
    public string MersisNumber { get; set; } // ABONE_MERSIS_NUMARASI
    public string Gender { get; set; } // ABONE_CINSIYET
    public string Nationality { get; set; } // ABONE_UYRUK
    public string FatherName { get; set; } // ABONE_BABA_ADI
    public string MotherName { get; set; } // ABONE_ANA_ADI
    public string MotherMaidenName { get; set; } // ABONE_ANNE_KIZLIK_SOYADI
    public string BirthPlace { get; set; } // ABONE_DOGUM_YERI
    public DateTime BirthDate { get; set; } // ABONE_DOGUM_TARIHI
    public string Profession { get; set; } // ABONE_MESLEK
}