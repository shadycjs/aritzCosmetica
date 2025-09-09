using Microsoft.EntityFrameworkCore;
using Aritz.Server.Models;

namespace Aritz.Server.Data
{
    public class AritzDbContext : DbContext
    {
        public AritzDbContext(DbContextOptions<AritzDbContext> options) : base(options)
        {
        }

        // Declaracion de tablas
        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Cart> Carts { get; set; }
        public DbSet<CartItems> CartItems { get; set; }
        public DbSet<Users> Users { get; set; }
        public DbSet<Orders> Orders { get; set; }
        public DbSet<OrderDetails> OrderDetails { get; set; }
        public DbSet<Payment> Payments { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Mapea la tabla "Users"
            modelBuilder.Entity<Users>(entity =>
            {
                entity.ToTable("Users"); // Nombre exacto de la tabla

                entity.HasKey(u => u.USR_ID); // Clave primaria

                entity.Property(u => u.USR_NAME).HasColumnName("USR_NAME");
                entity.Property(u => u.USR_SURNAME).HasColumnName("USR_SURNAME");
                entity.Property(u => u.USR_EMAIL).HasColumnName("USR_EMAIL");
                entity.Property(u => u.USR_PHONE_NUMBER).HasColumnName("USR_PHONE_NUMBER");
                entity.Property(u => u.USR_ADDRESS).HasColumnName("USR_ADDRESS");
                entity.Property(u => u.USR_CREATED_DATE).HasColumnName("USR_CREATED_DATE");
                entity.Property(u => u.USR_IS_ADMIN).HasColumnName("USR_IS_ADMIN");
            });

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

            // Configura la tabla "Cart"
            modelBuilder.Entity<Cart>(entity =>
            {
                entity.ToTable("Cart"); // Cambia "Cart" por el nombre correcto en tu base de datos
                entity.HasKey(c => c.CAR_ID);
                entity.HasOne(c => c.Users)
                      .WithMany()
                      .HasForeignKey(c => c.CAR_USR_ID)
                      .OnDelete(DeleteBehavior.Restrict);
                entity.HasMany(c => c.Items)
                      .WithOne(i => i.Cart)
                      .HasForeignKey(i => i.CAI_CAR_ID);
            });

            // Configura la tabla "Orders"
            modelBuilder.Entity<Orders>(entity =>
            {
                entity.ToTable("Orders");
                entity.HasKey(o => o.ORD_ID);
                entity.Property(o => o.ORD_USR_ID).HasColumnName("ORD_USR_ID").IsRequired();
                entity.Property(o => o.ORD_ORDER_DATE).HasColumnName("ORD_ORDER_DATE").IsRequired();
                entity.Property(o => o.ORD_TOTAL_AMOUNT).HasColumnName("ORD_TOTAL_AMOUNT").HasColumnType("decimal(18,2)").IsRequired();
                entity.Property(o => o.ORD_STATUS).HasColumnName("ORD_STATUS").HasMaxLength(50).IsRequired();
                entity.Property(o => o.ORD_PAYMENT_METHOD).HasColumnName("ORD_PAYMENT_METHOD").HasMaxLength(50).IsRequired();
                entity.HasOne(o => o.Users)
                      .WithMany()
                      .HasForeignKey(o => o.ORD_USR_ID)
                      .OnDelete(DeleteBehavior.Restrict);
                entity.HasMany(o => o.OrderDetails)
                      .WithOne(d => d.Orders)
                      .HasForeignKey(d => d.ODD_ORD_ID)
                      .OnDelete(DeleteBehavior.Cascade);
            });

            // Configura la tabla "OrderDetails"
            modelBuilder.Entity<OrderDetails>(entity =>
            {
                entity.ToTable("OrderDetails");
                entity.HasKey(d => d.ODD_ID);
                entity.Property(d => d.ODD_ORD_ID).HasColumnName("ODD_ORD_ID").IsRequired();
                entity.Property(d => d.ODD_PRD_ID).HasColumnName("ODD_PRD_ID").IsRequired();
                entity.Property(d => d.ODD_QUANTITY).HasColumnName("ODD_QUANTITY").IsRequired();
                entity.Property(d => d.ODD_TOTAL_PRICE).HasColumnName("ODD_TOTAL_PRICE").HasColumnType("decimal(18,2)").IsRequired();
                entity.HasOne(d => d.Products)
                      .WithMany()
                      .HasForeignKey(d => d.ODD_PRD_ID)
                      .OnDelete(DeleteBehavior.Restrict);
                entity.HasOne(d => d.Orders)
                      .WithMany(o => o.OrderDetails)
                      .HasForeignKey(d => d.ODD_ORD_ID)
                      .OnDelete(DeleteBehavior.Cascade);
            });

            // Configura la tabla "Payments"
            modelBuilder.Entity<Payment>(entity =>
            {
                entity.ToTable("Payments");
                entity.HasKey(p => p.PAY_ID);
                entity.Property(p => p.PAY_ORD_ID).HasColumnName("PAY_ORD_ID").IsRequired();
                entity.Property(p => p.PAY_PAYMENT_DATE).HasColumnName("PAY_PAYMENT_DATE").IsRequired();
                entity.Property(p => p.PAY_AMOUNT).HasColumnName("PAY_AMOUNT").HasColumnType("decimal(18,2)").IsRequired();
                entity.Property(p => p.PAY_STATUS).HasColumnName("PAY_STATUS").HasMaxLength(50).IsRequired();
                entity.Property(p => p.PAY_PAYMENT_REFERENCE).HasColumnName("PAY_PAYMENT_REFERENCE").HasMaxLength(100);
                entity.HasOne(p => p.Orders)
                      .WithMany()
                      .HasForeignKey(p => p.PAY_ORD_ID)
                      .OnDelete(DeleteBehavior.Restrict);
            });
        }
    }
}