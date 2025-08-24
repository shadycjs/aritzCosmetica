using Microsoft.EntityFrameworkCore;
using Aritz.Server.Models;

namespace Aritz.Server.Data
{
    public class AritzDbContext : DbContext
    {
        public AritzDbContext(DbContextOptions<AritzDbContext> options) : base(options)
        {
        }

        // Declara la tabla Products
        public DbSet<Product> Products { get; set; }
    }
}