using Aritz.Server.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

public class OrderCleanupService : BackgroundService
{
    private readonly IServiceProvider _serviceProvider;
    private readonly ILogger<OrderCleanupService> _logger;

    public OrderCleanupService(IServiceProvider serviceProvider, ILogger<OrderCleanupService> logger)
    {
        _serviceProvider = serviceProvider;
        _logger = logger;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        _logger.LogInformation("Servicio de limpieza de órdenes iniciado.");

        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                // Creamos un scope porque el DbContext suele ser "Scoped" y el BackgroundService es "Singleton"
                using (var scope = _serviceProvider.CreateScope())
                {
                    // Reemplaza 'TuDbContext' con el nombre real de tu contexto
                    var context = scope.ServiceProvider.GetRequiredService<AritzDbContext>();

                    // Definimos el límite de tiempo (hace 48 horas)
                    var limitDate = DateTime.Now.AddHours(-48);

                    // Buscamos órdenes:
                    // 1. Que NO estén canceladas ni finalizadas (solo pendientes)
                    // 2. Que sean más viejas que 48hs
                    // 3. Que NO tengan comprobante (ReceiptPath nulo o vacío)
                    var ordersToCancel = context.Orders
                        .Where(o =>
                            // 1. Que esté pendiente
                            o.ORD_STATUS == "Pendiente"

                            // 2. Que haya pasado el tiempo limite
                            && o.ORD_ORDER_DATE < limitDate

                            // 3. AQUÍ ESTÁ LA CLAVE: 
                            // Buscamos que NO (!signo de exclamación) exista ningún recibo asociado a esta orden
                            && !context.Receipts.Any(r => r.RCP_ORD_ID == o.ORD_ID)
                        )
                        // Opcional: Incluir detalles si necesitas devolver el stock (ver abajo)
                        .Include(o => o.OrderDetails)
                        .ToList();

                    if (ordersToCancel.Any())
                    {
                        foreach (var order in ordersToCancel)
                        {
                            order.ORD_STATUS = "Cancelado";
                            // Aquí podrías sumar el stock de vuelta si ya lo habías descontado
                        }

                        await context.SaveChangesAsync(stoppingToken);
                        _logger.LogInformation($"Se cancelaron automáticamente {ordersToCancel.Count} órdenes vencidas.");
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al ejecutar la limpieza de órdenes.");
            }

            // Esperar 1 hora antes de volver a verificar (ajusta según necesidad)
            await Task.Delay(TimeSpan.FromHours(1), stoppingToken);
        }
    }
}