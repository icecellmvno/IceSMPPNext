using IceSMPP.Models.Auth;
using IceSMPP.Models.Phonebook;
using IceSMPP.Models.Phonebook.Blacklist;
using IceSMPP.Models.Sms;
using IceSMPP.Models.Tenant;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace IceSMPP.Data;

public class ApplicationDbContext : IdentityDbContext<ApplicationUser, ApplicationRole, string>
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }
    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        builder.Entity<ApplicationUser>().ToTable("Users");
        builder.Entity<ApplicationRole>().ToTable("Roles");
        builder.Entity<IdentityUserRole<string>>().ToTable("UserRoles");
        builder.Entity<IdentityUserClaim<string>>().ToTable("UserClaims");
        builder.Entity<IdentityUserLogin<string>>().ToTable("UserLogins");
        builder.Entity<IdentityRoleClaim<string>>().ToTable("RoleClaims");
        builder.Entity<IdentityUserToken<string>>().ToTable("UserTokens");
        builder.Entity<TenantSubscriberInfo>().ToTable("CustomerInfo");
        builder.Entity<TenantAddress>().ToTable("CustomerAddresses");
        builder.Entity<TenantSubscriberIdentityType>().ToTable("CustomerIdentityTypes");
        builder.Entity<TenantModel>().ToTable("Customers");
        builder.Entity<SmsCDRModel.SmsCdr>().ToTable("SmsCDR");
        builder.Entity<BlacklistModel>().ToTable("Blacklist");
        builder.Entity<ContactsCustomFields>().ToTable("ContactsCustomFields");
        builder.Entity<ContactTags>().ToTable("ContactTags");
        builder.Entity<Contacts>().ToTable("Contacts");
        // Configure one-to-one relationship
   
     
    }
}