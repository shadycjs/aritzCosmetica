using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace Aritz.Server.Models
{
    public class PaymentMethod
    {
        [Key]
        public int PMT_ID { get; set; }
        [Required]
        [MaxLength(100)]
        public required string PMT_NAME { get; set; }
        public List<Orders> Orders { get; set; } = new List<Orders>(); // Propiedad de navegación
    }
}