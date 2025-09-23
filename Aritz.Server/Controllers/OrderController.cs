using Aritz.Server.Data;
using Aritz.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Org.BouncyCastle.Asn1.X500;

namespace Aritz.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderController : ControllerBase
    {
        private readonly AritzDbContext _context;

        public OrderController(AritzDbContext context)
        {
            _context = context;
        }

        [HttpPost("confirmOrder")]
        public async Task<IActionResult> Order([FromBody] OrderDto dto)
        {
            // Verificar si el método de pago existe
            var paymentMethod = await _context.PaymentMethods.FindAsync(dto.paymentMethod);
            if (paymentMethod == null)
            {
                Console.WriteLine($"Método de pago con ID {dto.paymentMethod} no encontrado.");
                return NotFound(new { Message = "El método de pago no existe." });
            }

            var Orders = new Orders
            {
                ORD_USR_ID = dto.userId,
                ORD_ORDER_DATE = DateTime.UtcNow,
                ORD_TOTAL_AMOUNT = dto.totalSumCart,
                ORD_STATUS = "Pendiente",
                ORD_PMT_ID = dto.paymentMethod
            };

            _context.Add(Orders);
            await _context.SaveChangesAsync();

            Console.WriteLine($"El order id es: {Orders.ORD_ID}");
            return Ok(new { Message = "Pedido creado correctamente.", OrderId = Orders.ORD_ID });
        }

        [HttpPost("confirmOrderDetail")]
        public async Task<IActionResult> OrderDetail([FromBody] OrderDetailDto dto)
        {
            var order = await _context.Orders.FindAsync(dto.OrderId);
            if (order == null)
            {
                return NotFound();
            }

            // Obtener el carrito del usuario
            var cart = await _context.Carts
                .Include(c => c.Items)
                .ThenInclude(i => i.Product)
                .FirstOrDefaultAsync(c => c.CAR_USR_ID == dto.userId);
            if (cart == null || !cart.Items.Any())
            {
                Console.WriteLine($"Carrito vacío para el usuario {dto.userId}.");
                return NotFound(new { Message = "El carrito está vacío." });
            }

            var orderDetails = cart.Items.Select(i => new OrderDetails
            {
                ODD_ORD_ID = dto.OrderId,
                ODD_PRD_ID = i.CAI_PRD_ID,
                ODD_QUANTITY = i.CAI_QUANTITY,
                ODD_TOTAL_PRICE = i.CAI_TOTAL_PRICE
            }).ToList();

            _context.OrderDetails.AddRange(orderDetails);
            _context.CartItems.RemoveRange(cart.Items); // Limpiar el carrito
            await _context.SaveChangesAsync();

            return Ok("Se inserto en la Order Details correctamente");
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetOrders(int userId)
        {

            // Verificar si el usuario existe
            var user = await _context.Users.FindAsync(userId);
            if (user == null)
            {
                Console.WriteLine($"Usuario con ID {userId} no encontrado.");
                return NotFound(new { Message = "El usuario no existe." });
            }

            var orders = await _context.Orders
                    .Where(o => o.ORD_USR_ID == userId)
                    .Include(o => o.PaymentMethod)
                    .Include(o => o.OrderDetails)
                    .ThenInclude(d => d.Products)
                    .GroupJoin(_context.Receipts,
                        o => o.ORD_ID,
                        r => r.RCP_ORD_ID,
                        (o, receipts) => new
                        {
                            o.ORD_ID,
                            o.ORD_ORDER_DATE,
                            o.ORD_TOTAL_AMOUNT,
                            o.ORD_STATUS,
                            PaymentMethod = o.PaymentMethod.PMT_NAME,
                            ReceiptPath = receipts.FirstOrDefault() != null ? receipts.FirstOrDefault().RCP_PATH : null
                        })
                    .ToListAsync();

                return Ok(orders);
        }

        [HttpGet("requestDetail/{orderId}")]
        public async Task<IActionResult> GetOrderById(int orderId)
        {
            var order = await _context.Orders.FindAsync(orderId);
            if (order == null)
            {
                Console.WriteLine($"No existe la orden nro {orderId}");
                return NotFound(new { Message = "La orden no existe." });
            }

            var orderDetail = await _context.OrderDetails
                .Where(o => o.ODD_ORD_ID == orderId)
                .Include(o => o.Products)
                .Select(od => new
                {
                    IdOrder = od.ODD_ORD_ID,
                    IdOrderDetail = od.ODD_ID,
                    Quantity = od.ODD_QUANTITY,
                    TotalPrice = od.ODD_TOTAL_PRICE,
                    ProductName = od.Products.PRD_NAME,
                    ProductImage = od.Products.PRD_IMAGE
                })
                .ToListAsync();

            Console.WriteLine(orderDetail);
            return Ok(orderDetail);
        }

        [HttpPost("{orderId}/upload-receipt")]
        public async Task<IActionResult> UploadReceipt(int orderId, IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest(new { Message = "No se proporcionó un archivo válido." });
            }

            // Verificar si la orden existe
            var order = await _context.Orders.FindAsync(orderId);
            if (order == null)
            {
                return NotFound(new
                {
                    Message = "La orden no existe." });
                }
        
            // Validar tipo de archivo
            var allowedExtensions = new[] { ".pdf", ".jpg", ".jpeg", ".png" };
                var extension = Path.GetExtension(file.FileName).ToLower();
                if (!allowedExtensions.Contains(extension))
                {
                    return BadRequest(new { Message = "Formato de archivo no permitido. Usa PDF, JPG o PNG." });
                }

                // Definir la ruta donde se guardará el archivo
                var fileName = $"receipt_{orderId}_{Guid.NewGuid()}{extension}";
                var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/uploads/receipts", fileName);

                // Crear directorio si no existe
                Directory.CreateDirectory(Path.GetDirectoryName(filePath));

                // Guardar el archivo
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                // Verificar si ya existe un comprobante para esta orden
                var existingReceipt = await _context.Receipts.FirstOrDefaultAsync(r => r.RCP_ORD_ID == orderId);
                if (existingReceipt != null)
                {
                    // Actualizar el comprobante existente
                    existingReceipt.RCP_PATH = $"/uploads/receipts/{fileName}";
                    existingReceipt.RCP_UPLOAD_DATE = DateTime.Now;
                }
                else
                {
                    // Crear un nuevo registro en Receipts
                    var receipt = new Receipts
                    {
                        RCP_ORD_ID = orderId,
                        RCP_PATH = $"/uploads/receipts/{fileName}",
                        RCP_UPLOAD_DATE = DateTime.Now
                    };
                    _context.Receipts.Add(receipt);
                }

                await _context.SaveChangesAsync();

                return Ok(new { Message = "Comprobante subido exitosamente.", ReceiptPath = $"/uploads/receipts/{fileName}" });
            }

        [HttpGet("{orderId}/download-receipt")]
        public async Task<IActionResult> DownloadReceipt(int orderId)
        {
            // Buscar el comprobante en la tabla Receipts
            var receipt = await _context.Receipts.FirstOrDefaultAsync(r => r.RCP_ORD_ID == orderId);
            if (receipt == null || string.IsNullOrEmpty(receipt.RCP_PATH))
            {
                return NotFound(new { Message = "No se encontró un comprobante para esta orden." });
            }

            // Obtener la ruta física del archivo
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", receipt.RCP_PATH.TrimStart('/'));
            if (!System.IO.File.Exists(filePath))
            {
                return NotFound(new { Message = "El archivo no existe en el servidor." });
            }

            // Leer el archivo
            var fileBytes = await System.IO.File.ReadAllBytesAsync(filePath);
            var fileName = Path.GetFileName(filePath);

            // Determinar el tipo MIME del archivo
            var mimeType = Path.GetExtension(fileName).ToLower() switch
            {
                ".pdf" => "application/pdf",
                ".jpg" => "image/jpeg",
                ".jpeg" => "image/jpeg",
                ".png" => "image/png",
                _ => "application/octet-stream"
            };

            // Enviar el archivo con Content-Disposition: attachment
            return File(fileBytes, mimeType, fileName);
        }

        public class OrderDto
        {
            public int userId { get; set; }
            public decimal totalSumCart { get; set; }
            public string? Status { get; set; }
            public int paymentMethod { get; set; }
        }

        public class OrderDetailDto
        {
            public int userId { get; set; }
            public int OrderId { get; set; }
        }
    }
}
