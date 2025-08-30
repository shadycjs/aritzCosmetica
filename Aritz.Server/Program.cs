using Aritz.Server.Data;
using Aritz.Server.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Configura CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", builder =>
    {
        builder.WithOrigins("https://localhost:50833") // Actualiza al origen correcto de tu React app
               .AllowAnyMethod()  // Permite GET, POST, PUT, DELETE, etc.
               .AllowAnyHeader()  // Permite headers como Authorization, Content-Type
               .AllowCredentials(); // Opcional: si usas cookies o autenticación
    });
});

// Configura el DbContext con la cadena de conexión
builder.Services.AddDbContext<AritzDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection"),
        sqlOptions => sqlOptions.EnableRetryOnFailure()
    ).LogTo(Console.WriteLine, LogLevel.Information)); // Log de consultas SQL

// Agrega servicios para controladores
builder.Services.AddControllers();

// Agrega servicios para Swagger/OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


builder.Services.AddTransient<IEmailService, EmailService>(); // Crea esta interfaz y clase abajo

var app = builder.Build();

// Configura el pipeline HTTP
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting(); // Asegura que el enrutamiento esté habilitado antes de CORS
app.UseCors("AllowReactApp"); // Mueve CORS después de UseRouting pero antes de UseAuthorization
app.UseAuthorization();
app.MapControllers();
app.MapFallbackToFile("/index.html");

app.Run();