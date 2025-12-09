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

        [HttpPost("updPrd")]
        public async Task<IActionResult> UpdProduct([FromBody] UpdateProductDto prdDto)
        {
            var products = await _context.Products.FirstOrDefaultAsync(p => p.PRD_ID == prdDto.PRD_ID);

            bool updated = false;

            if(products.PRD_NAME != prdDto.PRD_NAME)
            {
                products.PRD_NAME = prdDto.PRD_NAME;
                updated = true;
            }
            if (products.PRD_PRICE != prdDto.PRD_PRICE)
            {
                products.PRD_PRICE = prdDto.PRD_PRICE;
                updated = true;
            }
            if (products.PRD_QUANTITY != prdDto.PRD_QUANTITY)
            {
                products.PRD_QUANTITY = prdDto.PRD_QUANTITY;
                updated = true;
            }
            if (products.PRD_DESCRIPTION != prdDto.PRD_DESCRIPTION)
            {
                products.PRD_DESCRIPTION = prdDto.PRD_DESCRIPTION;
                updated = true;
            }
            if (products.PRD_IS_ACTIVE != prdDto.PRD_IS_ACTIVE)
            {
                products.PRD_IS_ACTIVE = prdDto.PRD_IS_ACTIVE;
                updated = true;
            }

            if (updated)
            {
                await _context.SaveChangesAsync();
                return Ok(new { Message = "Datos actualizados correctamente." });
            }
            else
            {
                return Ok(new { Message = "No hubo cambios en los datos." });
            }
        }

        [HttpPost("addPrd")]
        public async Task<IActionResult> AddProduct([FromForm] AddProductDto prdDto)
        {
            try
            {
                // 1. Validar que llegue imagen
                if (prdDto.PRD_IMAGE == null || prdDto.PRD_IMAGE.Length == 0)
                {
                    return BadRequest(new { Message = "Debes subir una imagen." });
                }

                // 2. Definir rutas (Usando la lógica segura que te funcionó)
                string currentDir = Directory.GetCurrentDirectory();
                string fileName = $"prod_{Guid.NewGuid()}{Path.GetExtension(prdDto.PRD_IMAGE.FileName)}";
                string filePath = Path.Combine(currentDir, "wwwroot", "images", fileName);

                // 3. Crear carpeta si no existe
                string directoryPath = Path.GetDirectoryName(filePath);
                if (!Directory.Exists(directoryPath))
                {
                    Directory.CreateDirectory(directoryPath);
                }

                // 4. Guardar archivo en disco
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await prdDto.PRD_IMAGE.CopyToAsync(stream);
                }

                // 5. Crear Entidad y Guardar en BD
                var product = new Product
                {
                    PRD_NAME = prdDto.PRD_NAME,
                    PRD_PRICE = prdDto.PRD_PRICE,
                    PRD_QUANTITY = prdDto.PRD_QUANTITY,
                    PRD_DESCRIPTION = prdDto.PRD_DESCRIPTION,
                    PRD_CAT_ID = prdDto.PRD_CAT_ID,
                    PRD_IS_ACTIVE = prdDto.PRD_IS_ACTIVE,
                    PRD_IMAGE = $"/images/{fileName}", // Guardamos la URL relativa
                };

                _context.Products.Add(product);
                await _context.SaveChangesAsync();

                return Ok(new { Message = "Producto creado exitosamente" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Error = ex.Message });
            }
        }

        public class AddProductDto
        {
            public string PRD_NAME { get; set; }
            public decimal PRD_PRICE { get; set; }
            public int PRD_QUANTITY { get; set; }
            public string? PRD_DESCRIPTION { get; set; }
            public bool PRD_IS_ACTIVE { get; set; }
            public IFormFile PRD_IMAGE { get; set; } // <--- Aquí llega el archivo
            public int PRD_CAT_ID { get; set; } 
        }

        public class UpdateProductDto
        {
            public int PRD_ID { get; set; }
            public string? PRD_NAME { get; set; }
            public string? PRD_DESCRIPTION { get; set; }
            public decimal PRD_PRICE { get; set; }
            public int PRD_QUANTITY { get; set; }
            public bool PRD_IS_ACTIVE { get; set; }
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