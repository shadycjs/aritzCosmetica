using System.ComponentModel.DataAnnotations;

namespace Aritz.Server.Models
{
    public class Category
    {
        [Key]
        public int CAT_ID { get; set; } // Clave primaria

        public required string CAT_NAME { get; set; } // Nombre de la categoría

        public string? CAT_DESCRIPTION { get; set; } // Descripción de la categoría (puede ser nula)
        public DateTime? CAT_CREATED_DATE { get; set; }

        // Propiedad de navegación para los productos relacionados
        public ICollection<Product>? Products { get; set; } // Relación con Productos
    }
}