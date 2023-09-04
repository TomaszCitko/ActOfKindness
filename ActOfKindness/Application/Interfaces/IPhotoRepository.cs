using Application.Dtos.Photo;
using Domain.Models;
using Microsoft.AspNetCore.Http;

namespace Application.Interfaces;

public interface IPhotoRepository
{
    Task<bool> SavePhotoToUserAsync(Photo? toSavePhoto, AppUser user);
    Task<bool> SavePhotoToEventAsync(Photo? toSavePhoto, Event currentEvent);
    Task<bool> DeletePhoto(Photo photoToRemove, AppUser user);
    Task<Photo?> FindPhoto(string photoId,AppUser user);
    Task<Photo?> FindPhotoWithoutUser(string photoUrl);
    Task<bool> SaveAsync();

}