using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class Change_EventUser_Delete_Behavior : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EventUser_Events_EventId",
                table: "EventUser");

            migrationBuilder.AddForeignKey(
                name: "FK_EventUser_Events_EventId",
                table: "EventUser",
                column: "EventId",
                principalTable: "Events",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EventUser_Events_EventId",
                table: "EventUser");

            migrationBuilder.AddForeignKey(
                name: "FK_EventUser_Events_EventId",
                table: "EventUser",
                column: "EventId",
                principalTable: "Events",
                principalColumn: "Id");
        }
    }
}
