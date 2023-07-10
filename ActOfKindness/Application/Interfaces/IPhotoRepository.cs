using Application.Dtos.Photo;
using Domain.Models;
using Microsoft.AspNetCore.Http;

namespace Application.Interfaces;

public interface IPhotoRepository
{
    Task<bool> SavePhoto(Photo? toSavePhoto, AppUser user);
    Task<bool> DeletePhoto(Photo photoToRemove, AppUser user);
    Task<Photo?> FindPhoto(string photoId,AppUser user);
}