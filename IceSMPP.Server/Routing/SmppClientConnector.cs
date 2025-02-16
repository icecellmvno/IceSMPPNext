using IceSMPP.Server.Models;
using Inetlab.SMPP;

namespace IceSMPP.Server.Routing;

public static class SmppClientConnector
{
    private static  List<SmppClientConnectorModel> _sessions = new List<SmppClientConnectorModel>();

    public static void AddClient(SmppClientConnectorModel client)
    {
        client.Client = new SmppClient();
        client.Client.Name = client.Name;
        
        _sessions.Add(client);
    }

    public static void RemoveClient(SmppClientConnectorModel client)
    {
        var currentClient = _sessions.Where(x => x.Name == client.Name).FirstOrDefault();
        currentClient.Client.Disconnect();
        _sessions.Remove(currentClient);
        
    }

    public static async Task ConnectClient(string name)
    {
        var currentClient = _sessions.Where(x => x.Name == name).FirstOrDefault();
        currentClient.Client.ConnectAsync(currentClient.Options);
        
    }

    private static void AttachEvents(SmppClient client)
    {
        
    }
    private static void DettachEvents(SmppClient client)
    {
        
    }

    public static async Task DisconnectClient(SmppClientConnectorModel client)
    {
        var currentClient = _sessions.Where(x => x.Name == client.Name).FirstOrDefault();
        await currentClient.Client.Disconnect();
    }

    public static string GetClientStatus(string name)
    {
        var client = _sessions.Where(x => x.Name == name).FirstOrDefault();
        return client.Client.Status.ToString();
    }
}