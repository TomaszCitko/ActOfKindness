using Application.Dtos.Photo;
using Domain.Models;
using Microsoft.AspNetCore.Http;

namespace Application.Interfaces;

public interface IPhotoService
{
    Task<PhotoUpload?> AddPhoto(IFormFile file);
    Task<string?> DeletePhoto(string photoId);
    Task<Photo?> SavePhotoToUserAsync(IFormFile file);
    Task<Photo?> UploadPhotoAsync(IFormFile file);
    Task<Photo?> SavePhotoToEventAsync(IFormFile file, Guid eventId);
    Task<string?> DeletePhotoFromUserAsync(string photoId);
    Task <string?> SetMainPhotoForUser(string photoId);
}