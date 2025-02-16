using System.ComponentModel.DataAnnotations;
using Inetlab.SMPP;
using Inetlab.SMPP.Common;

namespace IceSMPP.Server.Models;

public class SmppClientConnectorModel
{
    public int Id { get; set; }
    [Required]
    public string Name { get; set; }
    public string OperatorName { get; set; }
    public SmppClientConnectionOptions Options { get; set; }
    public SmppClient Client { get; set; }
}