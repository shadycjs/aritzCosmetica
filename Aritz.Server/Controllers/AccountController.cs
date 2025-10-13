using Aritz.Server.Data;
using Aritz.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.Identity.Client;
using Org.BouncyCastle.Asn1.X500;
using static Aritz.Server.Controllers.OrderController;

namespace Aritz.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly AritzDbContext _context;

        public AccountController(AritzDbContext context)
        {
            _context = context;
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetAccount(int userId)
        {
            var user = await _context.Users.FindAsync(userId);
            if(user == null)
            {
                Console.WriteLine($"Usuario no encontrado.");
                return NotFound(new { Message = "El usuario no existe." });
            }

            
            return Ok(user);
        }

        [HttpPost("updPersonalData/{userId}")]
        public async Task<IActionResult> UpdPersonalData([FromBody] PersonalData dtoPd, int userId)
        {
            var user = await _context.Users
            .FirstOrDefaultAsync(u => u.USR_ID == userId);
            if (user == null)
            {
                Console.WriteLine($"Usuario con ID {userId} no encontrado usando FirstOrDefaultAsync.");
                return NotFound("El usuario no existe.");
            }

            bool updated = false;

            if (user.USR_NAME != dtoPd.nombre)
            {
                user.USR_NAME = dtoPd.nombre;
                updated = true;
            }
            if (user.USR_SURNAME != dtoPd.apellido)
            {
                user.USR_SURNAME = dtoPd.apellido;
                updated = true;
            }
            // Si USR_DOCUMENT_NUMBER es string en tu modelo, convierte dtoPd.documento a string
            string documentoStr = dtoPd.documento.ToString();
            if (user.USR_DOCUMENT_NUMBER != documentoStr)
            {
                user.USR_DOCUMENT_NUMBER = documentoStr;
                updated = true;
            }

            if (updated)
            {
                await _context.SaveChangesAsync();
                return Ok(new { Message = "Datos actualizados correctamente." });
            }
            else
            {
                return Ok(new { Message = "No hubo cambios en los datos." });
            }

        }

        [HttpPost("updDom/{userId}")]
        public async Task<IActionResult> UpdDomData([FromBody] DomicilioData dtoDom, int userId)
        {
            var user = await _context.Users
            .FirstOrDefaultAsync(u => u.USR_ID == userId);
            if (user == null)
            {
                Console.WriteLine($"Usuario con ID {userId} no encontrado usando FirstOrDefaultAsync.");
                return NotFound("El usuario no existe.");
            }

            bool updated = false;

            if (user.USR_PROVINCE != dtoDom.provincia)
            {
                user.USR_PROVINCE = dtoDom.provincia;
                updated = true;
            }
            if (user.USR_CITY != dtoDom.ciudad)
            {
                user.USR_CITY = dtoDom.ciudad;
                updated = true;
            }

            string postalcode = dtoDom.codpostal.ToString();
            if (user.USR_POSTAL_CODE != postalcode)
            {
                user.USR_POSTAL_CODE = postalcode;
                updated = true;
            }
            if (user.USR_STREET != dtoDom.calle)
            {
                user.USR_STREET = dtoDom.calle;
                updated = true;
            }

            string alt = dtoDom.altura.ToString();
            if (user.USR_STREET_NUMBER != alt)
            {
                user.USR_STREET_NUMBER = alt;
                updated = true;
            }

            string piso = dtoDom.piso.ToString();
            if (user.USR_FLOOR != piso)
            {
                user.USR_FLOOR = piso;
                updated = true;
            }

            string casa = dtoDom.casadepto.ToString();
            if (user.USR_APARTMENT != casa)
            {
                user.USR_APARTMENT = casa;
                updated = true;
            }

            if (updated)
            {
                await _context.SaveChangesAsync();
                return Ok(new { Message = "Datos actualizados correctamente." });
            }
            else
            {
                return Ok(new { Message = "No hubo cambios en los datos." });
            }

        }

        public class PersonalData
        {
            public string nombre { get; set; }
            public string apellido { get; set; }
            public int documento { get; set; }
        }

        public class DomicilioData
        {
            public string provincia { get; set; }
            public string ciudad { get; set; }
            public int codpostal { get; set; }
            public string calle { get; set; }
            public int altura { get; set; }
            public int piso { get; set; }
            public int casadepto { get; set; }
        }

    }
}
