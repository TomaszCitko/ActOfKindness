using Application.Interfaces;
using Domain.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PhotoController : ControllerBase
    {
        private readonly IPhotoService _photoService;

        public PhotoController(IPhotoService photoService)
        {
            _photoService = photoService;
        }

        [HttpPost]
        public async Task<ActionResult<Photo>> SavePhoto([FromForm] IFormFile File)
        {
            var result = await _photoService.SavePhotoToUserAsync(File);
            return result ?? throw new InvalidOperationException();
        }

        [HttpPost("{id}")]
        public async Task<ActionResult<string>> DeletePhoto(string id)
        {
            var result = await _photoService.DeletePhotoFromUserAsync(id);
            return result ?? throw new InvalidOperationException();
        }
    }
}
