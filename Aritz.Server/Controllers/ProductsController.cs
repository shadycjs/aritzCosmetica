using Microsoft.AspNetCore.Mvc;
using Aritz.Server.Data;
using Aritz.Server.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace Aritz.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly AritzDbContext _context;

        // Inyección de dependencia del DbContext
        public ProductsController(AritzDbContext context)
        {
            _context = context;
        }

        // GET: api/products
        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetProducts()
        {
            var products = await _context.Products
                                .Include(p => p.Category)
                                .Select(p => new ProductDto
                                {
                                    PRD_ID = p.PRD_ID,
                                    PRD_NAME = p.PRD_NAME,
                                    PRD_DESCRIPTION = p.PRD_DESCRIPTION,
                                    PRD_IMAGE = p.PRD_IMAGE,
                                    PRD_PRICE = p.PRD_PRICE,
                                    PRD_QUANTITY = p.PRD_QUANTITY,
                                    PRD_IS_ACTIVE = p.PRD_IS_ACTIVE,
                                    Category = new CategoryDto
                                    {
                                        CAT_ID = p.Category.CAT_ID,
                                        CAT_NAME = p.Category.CAT_NAME
                                    }
                                })
                                .ToListAsync(); // Consulta la tabla "Products" y join con "Categories"
            Console.WriteLine(products);
            return Ok(products); // Retorna los productos
        }

        // GET: api/products/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _context.Products
                                .Include(p => p.Category)
                                .Where(p => p.PRD_ID == id)
                                .Select(p => new ProductDto
                                {
                                    PRD_ID = p.PRD_ID,
                                    PRD_NAME = p.PRD_NAME,
                                    PRD_DESCRIPTION = p.PRD_DESCRIPTION,
                                    PRD_IMAGE = p.PRD_IMAGE,
                                    PRD_PRICE = p.PRD_PRICE,
                                    PRD_QUANTITY = p.PRD_QUANTITY,
                                    Category = new CategoryDto
                                    {
                                        CAT_ID = p.Category.CAT_ID,
                                        CAT_NAME = p.Category.CAT_NAME
                                    }
                                })
                                .FirstOrDefaultAsync();
            if (product == null)
            {
                return NotFound();
            }

            return Ok(product);
        }

        [HttpGet("by-category")]
        public async Task<ActionResult<List<Category>>> GetProductsByCategory()
        {
            var categories = await _context.Categories
                    .Include(c => c.Products) // Carga los productos relacionados con cada categoría
                    .Select(c => new CategoryWithProductsDto
                    {
                        CAT_ID = c.CAT_ID,
                        CAT_NAME = c.CAT_NAME,
                        Products = c.Products.Select(p => new ProductDto
                        {
                            PRD_ID = p.PRD_ID,
                            PRD_NAME = p.PRD_NAME,
                            PRD_DESCRIPTION = p.PRD_DESCRIPTION,
                            PRD_IMAGE = p.PRD_IMAGE,
                            PRD_PRICE = p.PRD_PRICE,
                            PRD_QUANTITY = p.PRD_QUANTITY
                        }).ToList()
                    })
                    .ToListAsync();

            return Ok(categories);
        }

        public class ProductDto
        {
            public int PRD_ID { get; set; }
            public string? PRD_NAME { get; set; }
            public string? PRD_DESCRIPTION { get; set; }
            public decimal PRD_PRICE { get; set; } // Mapea con Price
            public int PRD_QUANTITY { get; set; }     // Mapea con Stock
            public bool? PRD_IS_ACTIVE { get; set; }
            public string? PRD_IMAGE { get; set; } // Mapea con ImageUrl (puede ser nulo)
            public CategoryDto Category { get; set; }
        }

        public class CategoryDto
        {
            public int CAT_ID { get; set; }
            public string CAT_NAME { get; set; }
            // No incluimos la lista de Products
        }

        public class CategoryWithProductsDto
        {
            public int CAT_ID { get; set; }
            public string CAT_NAME { get; set; }
            public List<ProductDto> Products { get; set; } = new List<ProductDto>();
        }
    }
}