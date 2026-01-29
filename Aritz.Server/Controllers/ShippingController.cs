using Aritz.Server.Data; // Tu namespace del DbContext
using Aritz.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Aritz.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShippingController : ControllerBase
    {
        private readonly AritzDbContext _context;

        public ShippingController(AritzDbContext context)
        {
            _context = context;
        }

        [HttpGet("calculate")]
        public async Task<IActionResult> Calculate([FromQuery] string zipCode)
        {
            
            if (string.IsNullOrEmpty(zipCode) || !int.TryParse(zipCode, out int cp))
            {
                return BadRequest(new { Message = "Código postal inválido" });
            }

            var zone = await _context.ShippingZones
                .FirstOrDefaultAsync(z => cp >= z.MinZipCode && cp <= z.MaxZipCode);

            decimal finalPrice;

            if (zone != null)
            {
                finalPrice = zone.Price;
            }
            else
            {
                finalPrice = 10000;
            }

            return Ok(new
            {
                ZipCode = zipCode,
                ZoneName = zone?.Name ?? "Estándar",
                Price = finalPrice
            });
        }

        // --- EXTRA PARA EL ADMINISTRADOR ---

        // POST: api/Shipping/update (Para que puedas editar precios desde Postman o tu Panel Admin)
        [HttpPost("update")]
        public async Task<IActionResult> UpdatePostalCode([FromBody] ShippingZone zoneDto)
        {
            var zone = await _context.ShippingZones.FindAsync(zoneDto.Id);
            if (zone == null) return NotFound("Zona no encontrada");

            zone.Price = zoneDto.Price;
            // zone.MinZipCode = zoneDto.MinZipCode; // Si quieres editar rangos también

            await _context.SaveChangesAsync();
            return Ok("Precio actualizado correctamente");
        }


        [HttpGet("getPostalCodes")]
        public async Task<IActionResult> GetPostalCodes()
        {
            var postalCodes = await _context.ShippingZones
                                            .ToListAsync(); // Obtengo todos los codigos postales

            if (postalCodes == null)
            {
                return BadRequest(new { Message = "No se encontraron los codigos postales" });
            }

            return Ok(postalCodes);
        }

    }
}