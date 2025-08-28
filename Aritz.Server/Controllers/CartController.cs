using Aritz.Server.Data;
using Aritz.Server.Models;
using Azure.Core;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Aritz.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CartController : ControllerBase
    {
        private readonly AritzDbContext _context;

        public CartController(AritzDbContext context)
        {
            _context = context;
        }

        // POST: api/cart/add-to-cart
        [HttpPost("add-to-cart")]
        public async Task<IActionResult> AddToCart([FromBody] AddToCartRequest request)
        {
            Console.WriteLine($"Verificando si el usuario existe: UserId={request.userId}");

            // Intenta buscar el usuario con FindAsync
            var user = await _context.Users.FindAsync(request.userId);
            if (user == null)
            {
                Console.WriteLine($"Usuario con ID {request.userId} no encontrado usando FindAsync.");
            }
            else
            {
                Console.WriteLine($"Usuario encontrado: {user.USR_NAME} {user.USR_SURNAME}");
            }

            // Alternativa: Buscar el usuario con FirstOrDefaultAsync
            user = await _context.Users
                .FirstOrDefaultAsync(u => u.USR_ID == request.userId);
            if (user == null)
            {
                Console.WriteLine($"Usuario con ID {request.userId} no encontrado usando FirstOrDefaultAsync.");
                return NotFound("El usuario no existe.");
            }

            // Verifica si ya existe un carrito para el usuario
            var cart = await _context.Carts
                .Include(c => c.Items)
                .FirstOrDefaultAsync(c => c.CAR_USR_ID == request.userId);

            if (cart == null)
            {
                // Si no hay carrito, crea uno
                cart = new Cart { CAR_USR_ID = request.userId };
                _context.Carts.Add(cart);
                await _context.SaveChangesAsync();
            }

            // Verifica si el producto ya existe en el carrito
            var cartItem = cart.Items?.FirstOrDefault(i => i.CAI_PRD_ID == request.productId);
            if (cartItem != null)
            {
                // Ya existe: actualiza la cantidad
                cartItem.CAI_QUANTITY += request.quantity;
            }
            else
            {
                // Nuevo producto: agrégalo como un nuevo ítem
                var product = await _context.Products.FindAsync(request.productId);
                if (product == null)
                {
                    return NotFound("Producto no encontrado.");
                }

                cartItem = new CartItems
                {
                    CAI_CAR_ID = cart.CAR_ID,
                    CAI_PRD_ID = request.productId,
                    CAI_QUANTITY = request.quantity,
                    CAI_TOTAL_PRICE = product.PRD_PRICE * request.quantity
                };
                _context.CartItems.Add(cartItem);
            }

            await _context.SaveChangesAsync();

            return Ok("Producto agregado al carrito.");
        }

        // GET: api/cart/user/{userId}
        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetCart(int userId)
        {
            var cart = await _context.Carts
                .Include(c => c.Items)
                .ThenInclude(i => i.Product)
                .FirstOrDefaultAsync(c => c.CAR_USR_ID == userId);

            if (cart == null || cart.Items == null || !cart.Items.Any())
            {
                return Ok(new { Message = "El carrito está vacío." });
            }

            return Ok(cart.Items.Select(i => new
            {
                i.CAI_ID,
                i.Product.PRD_NAME,
                i.CAI_QUANTITY,
                i.CAI_TOTAL_PRICE
            }));
        }
    }
}