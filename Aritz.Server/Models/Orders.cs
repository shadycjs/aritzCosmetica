using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Aritz.Server.Models
{
    public class Orders
    {
        [Key]
        public int ORD_ID { get; set; }
        public int ORD_USR_ID { get; set; }
        [ForeignKey("ORD_USR_ID")]
        public Users? Users { get; set; }
        public DateTime? ORD_ORDER_DATE { get; set; }
        public decimal? ORD_TOTAL_AMOUNT { get; set; }
        public string? ORD_STATUS { get; set; }
        public string? ORD_PAYMENT_METHOD { get; set; }
        public List<OrderDetails> OrderDetails { get; set; } = new List<OrderDetails>();
    }
}
