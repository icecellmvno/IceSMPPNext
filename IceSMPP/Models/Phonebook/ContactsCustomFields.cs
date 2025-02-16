namespace IceSMPP.Models.Phonebook;

public class ContactsCustomFields
{
    public Int64 Id { get; set; }
    public Int64 ContactId { get; set; }
    public ContactsCustomFieldsType FieldType { get; set; }
    public string FieldName { get; set; }
    public string FieldValue { get; set; }
}