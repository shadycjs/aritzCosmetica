using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Aritz.Server.Models
{
    public class Users
    {
        [Key]
        public int USR_ID { get; set; }
        public required string USR_NAME { get; set; }
        public required string USR_SURNAME { get; set; }
        public required string USR_EMAIL { get; set; }
        public required string USR_PASSWORD_HASH { get; set; }
        public string? USR_PHONE_NUMBER { get; set; }
        public string? USR_ADDRESS { get; set; }
        public DateTime? USR_CREATED_DATE { get; set; }
        public bool USR_IS_ADMIN { get; set; }
    }
}
