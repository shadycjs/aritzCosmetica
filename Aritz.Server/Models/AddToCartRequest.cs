namespace Aritz.Server.Models
{
    public class AddToCartRequest
    {
        public int userId { get; set; }
        public int productId { get; set; }
        public int quantity { get; set; }
    }
}
