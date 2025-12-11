using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Aritz.Server.Models
{
    public class Product
    {
        [Key] public int PRD_ID { get; set; }  // Mapea con la columna ProductId en la DB
        public required string PRD_NAME { get; set; }   // Mapea con Name
        public string? PRD_DESCRIPTION { get; set; } // Mapea con Description (puede ser nulo)
        public decimal PRD_PRICE { get; set; } // Mapea con Price
        public int PRD_QUANTITY { get; set; }     // Mapea con Stock
        public string? PRD_IMAGE { get; set; } // Mapea con ImageUrl (puede ser nulo)
        public int PRD_CAT_ID { get; set; }
        public bool? PRD_IS_ACTIVE { get; set; }
        public DateTime? PRD_CREATED_DATE { get; set; }
        // Propiedad de navegación para la relación con Categories
        [ForeignKey("PRD_CAT_ID")] // Relaciona esta propiedad con PRD_CAT_ID en Categories
        public Category? Category { get; set; } // Relación con la tabla Categories
        public List<ProductImage> ProductImages { get; set; } = new List<ProductImage>();
    }
}
