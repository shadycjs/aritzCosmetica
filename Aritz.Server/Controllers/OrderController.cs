using Microsoft.AspNetCore.Mvc;
using Aritz.Server.Data;
using Aritz.Server.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

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
