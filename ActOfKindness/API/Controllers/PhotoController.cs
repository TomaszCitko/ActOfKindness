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

        [HttpPost("user")]
        public async Task<ActionResult<Photo>> SavePhotoToUser([FromForm] IFormFile File)
        {
            return await _photoService.SavePhotoToUserAsync(File) ?? throw new InvalidOperationException();
        }

        [HttpPost("event/{eventId:guid}")]
        public async Task<ActionResult<Photo>> SavePhotoToEvent([FromForm] IFormFile File,Guid eventId)
        {
            return await _photoService.SavePhotoToEventAsync(File,eventId) ?? throw new InvalidOperationException();
        }



        [HttpPost("{id}")]
        public async Task<ActionResult<string>> DeletePhotoFromUser(string id)
        {
            return await _photoService.DeletePhotoFromUserAsync(id) ?? throw new InvalidOperationException();
        }

        [HttpPost("{photoId}/setMain")]
        public async Task<ActionResult<string>> SetMainPhotoForUser(string photoId)
        {
            return await _photoService.SetMainPhotoForUser(photoId) ?? throw new InvalidOperationException();
        }
}
}
