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
    }
}
