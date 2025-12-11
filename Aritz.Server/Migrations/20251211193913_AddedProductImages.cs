using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Aritz.Server.Migrations
{
    /// <inheritdoc />
    public partial class AddedProductImages : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // --- BORRAMOS TODO LO QUE CREABA TABLAS VIEJAS ---
            // (Categories, Users, Products, Cart, Orders, etc. ya existen)

            // --- DEJAMOS SOLO LA CREACIÓN DE LA NUEVA TABLA ---
            migrationBuilder.CreateTable(
                name: "ProductImages",
                columns: table => new
                {
                    IMG_ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IMG_URL = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IMG_PRD_ID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductImages", x => x.IMG_ID);
                    table.ForeignKey(
                        name: "FK_ProductImages_Products_IMG_PRD_ID",
                        column: x => x.IMG_PRD_ID,
                        principalTable: "Products",
                        principalColumn: "PRD_ID",
                        onDelete: ReferentialAction.Cascade);
                });

            // --- DEJAMOS SOLO EL ÍNDICE DE LA NUEVA TABLA ---
            migrationBuilder.CreateIndex(
                name: "IX_ProductImages_IMG_PRD_ID",
                table: "ProductImages",
                column: "IMG_PRD_ID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // En el método Down (Deshacer), solo borramos la tabla nueva
            // Si dejabas lo anterior, al deshacer te hubiera borrado TODA la base de datos.

            migrationBuilder.DropTable(
                name: "ProductImages");
        }
    }
}