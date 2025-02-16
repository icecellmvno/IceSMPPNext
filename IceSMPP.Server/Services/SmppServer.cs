using System.Net;
using Inetlab.SMPP;

namespace IceSMPP.Server.Services;

public class IceSmppServer:IHostedService
{
    
    private SmppServer _smppServer;
    public IceSmppServer()
    {
        _smppServer = new SmppServer(new IPEndPoint(IPAddress.Any, 2775));
    
        
    }

    private void SmppServerOnevServerStarted(object? sender, EventArgs e)
    {
        Console.WriteLine("Server started");
    }

    public async Task StartAsync(CancellationToken cancellationToken)
    {
        _smppServer.Start();
    }

    public async Task StopAsync(CancellationToken cancellationToken)
    {
        _smppServer.Stop();
    }
}