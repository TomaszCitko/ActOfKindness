using Application.Dtos.Photo;
using Domain.Models;
using Microsoft.AspNetCore.Http;

namespace Application.Interfaces;

public interface IPhotoService
{
    Task<PhotoUpload?> AddPhoto(IFormFile file);
    Task<string?> DeletePhoto(string photoId);
    Task<Photo?> SavePhotoToUserAsync(IFormFile file);
    Task<string?> DeletePhotoFromUserAsync(string photoId);
}