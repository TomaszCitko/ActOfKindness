using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class Init : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Events",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Localization = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: true),
                    IsOnline = table.Column<bool>(type: "bit", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(80)", maxLength: 80, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(2000)", maxLength: 2000, nullable: false),
                    StartingDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EndingDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsDone = table.Column<bool>(type: "bit", nullable: false),
                    Latitude = table.Column<double>(type: "float", nullable: true),
                    Longitude = table.Column<double>(type: "float", nullable: true),
                    IsModerated = table.Column<bool>(type: "bit", nullable: false),
                    Type = table.Column<int>(type: "int", nullable: false),
                    Image = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Events", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Events",
                columns: new[] { "Id", "CreatedTime", "Description", "EndingDate", "Image", "IsDone", "IsModerated", "IsOnline", "Latitude", "Localization", "Longitude", "StartingDate", "Title", "Type", "UserId" },
                values: new object[,]
                {
                    { 1, new DateTime(2023, 6, 13, 11, 47, 2, 916, DateTimeKind.Local).AddTicks(286), "Assum vulputate rebum ea et. Autem aliquip erat luptatum labore dolores feugait amet amet molestie duis rebum assum delenit eum nonumy aliquyam diam. Nonummy duis sanctus justo.Elitr ut amet volutpat minim stet duo duo esse. Est vel amet nonumy est dolores sanctus sit gubergren. Vulputate nulla sed et ea veniam invidunt at magna. In sed iriure aliquyam et duis rebum eum lorem dignissim consequat. Lorem amet nonumy diam. Esse ut te sanctus gubergren sed ea. Clita et placerat duo est diam voluptua tempor vero aliquyam sed vero magna consequat invidunt lorem gubergren. Nonumy ipsum mazim nonummy et dolore clita sea et diam. Est et diam nibh dolor stet sea sed at. Feugait ut no erat ea ipsum aliquyam ", new DateTime(2023, 7, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Vue_de_nuit_de_la_Place_Stanislas_%C3%A0_Nancy.jpg/1920px-Vue_de_nuit_de_la_Place_Stanislas_%C3%A0_Nancy.jpg", false, true, false, null, null, null, new DateTime(2023, 6, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), "Test Title", 0, "1" },
                    { 2, new DateTime(2023, 6, 13, 11, 47, 2, 916, DateTimeKind.Local).AddTicks(355), "Assum vulputate rebum ea et. Autem aliquip erat luptatum labore dolores feugait amet amet molestie duis rebum assum delenit eum nonumy aliquyam diam. Nonummy duis sanctus justo.Elitr ut amet volutpat minim stet duo duo esse. Est vel amet nonumy est dolores sanctus sit gubergren. Vulputate nulla sed et ea veniam invidunt at magna. In sed iriure aliquyam et duis rebum eum lorem dignissim consequat. Lorem amet nonumy diam. Esse ut te sanctus gubergren sed ea. Clita et placerat duo est diam voluptua tempor vero aliquyam sed vero magna consequat invidunt lorem gubergren. Nonumy ipsum mazim nonummy et dolore clita sea et diam. Est et diam nibh dolor stet sea sed at. Feugait ut no erat ea ipsum aliquyam ", new DateTime(2023, 8, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Vue_de_nuit_de_la_Place_Stanislas_%C3%A0_Nancy.jpg/1920px-Vue_de_nuit_de_la_Place_Stanislas_%C3%A0_Nancy.jpg", false, true, false, null, null, null, new DateTime(2023, 7, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), "Test Title", 0, "2" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Events");
        }
    }
}
