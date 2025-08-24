namespace Aritz.Server.Models
{
    public class Product
    {
        public int ProductId { get; set; }  // Mapea con la columna ProductId en la DB
        public string Name { get; set; }   // Mapea con Name
        public string? Description { get; set; } // Mapea con Description (puede ser nulo)
        public decimal Price { get; set; } // Mapea con Price
        public int Stock { get; set; }     // Mapea con Stock
        public string? ImageUrl { get; set; } // Mapea con ImageUrl (puede ser nulo)
    }
}
