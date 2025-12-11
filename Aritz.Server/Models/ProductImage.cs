using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Aritz.Server.Models
{
    public class ProductImage
    {
        [Key]
        public int IMG_ID { get; set; }

        public string IMG_URL { get; set; } // La ruta de la imagen (/images/foto.jpg)

        // Relación con Product (Foreign Key)
        public int IMG_PRD_ID { get; set; }

        [ForeignKey("IMG_PRD_ID")]
        public Product Product { get; set; }
    }
}
