using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Aritz.Server.Models
{
    public class Cart
    {
        [Key]
        public int CAR_ID { get; set; } 
        public DateTime? CAR_CREATED_DATE { get; set; }
        public int CAR_USR_ID { get; set; }
        [ForeignKey("CAR_USR_ID")]
        public Users? Users { get; set; }
        public ICollection<CartItems>? Items { get; set; } // Relación con CartItems
    }
}
