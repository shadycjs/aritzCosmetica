using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace Aritz.Server.Models
{
    public class Receipts
    {
        [Key]
        public int RCP_ID { get; set; }
        public int RCP_ORD_ID { get; set; }
        [ForeignKey("RCP_ORD_ID")]
        public Orders? Orders { get; set; }
        public string RCP_PATH { get; set; }
        public DateTime RCP_UPLOAD_DATE { get; set; }

    }
}
