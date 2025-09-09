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
            var Orders = new Orders
            {
                ORD_USR_ID = dto.userId,
                ORD_ORDER_DATE = DateTime.UtcNow,
                ORD_TOTAL_AMOUNT = dto.totalSumCart,
                ORD_STATUS = "Pendiente",
                ORD_PAYMENT_METHOD = "Efectivo"
            };

            _context.Add(Orders);
            await _context.SaveChangesAsync();

            return Ok("Se confirmo la orden");
        }

        public class OrderDto
        {
            public int userId { get; set; }
            public decimal totalSumCart { get; set; }
            public string? Status { get; set; }
            public string? Method { get; set; }
        }
    }
}
