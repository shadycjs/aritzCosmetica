using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Aritz.Server.Models
{
    public class CartItems
    {
        [Key]
        public int CAI_ID { get; set; }
        public int CAI_CAR_ID { get; set; }
        public int CAI_PRD_ID { get; set; }
        public int CAI_QUANTITY { get; set; }
        public decimal CAI_TOTAL_PRICE { get; set; }
        [ForeignKey("CAI_CAR_ID")]
        public Cart? Cart { get; set; }
        [ForeignKey("CAI_PRD_ID")]
        public Product? Product { get; set; }
    }
}
