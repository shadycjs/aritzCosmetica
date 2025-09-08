using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Aritz.Server.Models
{
    public class Payment
    {
        [Key]
        public int PAY_ID { get; set; }
        public int PAY_ORD_ID { get; set; }
        [ForeignKey("PAY_ORD_ID")]
        public Orders? Orders { get; set; }
        public DateTime? PAY_PAYMENT_DATE { get; set; }
        public decimal? PAY_AMOUNT { get; set; }
        public string? PAY_STATUS { get; set; }
        public string? PAY_PAYMENT_REFERENCE { get; set; }

    }
}
