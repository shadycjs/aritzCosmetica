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
        // Declara la tabla Categories
        public DbSet<Category> Categories { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configura la tabla "Products"
            modelBuilder.Entity<Product>(entity =>
            {
                entity.ToTable("Products"); // Asegúrate de que el nombre sea correcto
                entity.HasKey(e => e.PRD_ID); // Clave primaria

                entity.Property(e => e.PRD_NAME)
                      .HasColumnName("PRD_NAME")
                      .HasMaxLength(100)
                      .IsRequired();

                entity.HasOne(e => e.Category)
                      .WithMany(c => c.Products)
                      .HasForeignKey(e => e.PRD_CAT_ID)
                      .OnDelete(DeleteBehavior.Restrict);
            });

            // Configura la tabla "Categories"
            modelBuilder.Entity<Category>(entity =>
            {
                entity.ToTable("Categories");
                entity.HasKey(e => e.CAT_ID);
            });
        }
    }
}