using Application.Dtos.Photo;
using Application.Interfaces;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Domain.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;

namespace Persistence.Repositories;

public class PhotoRepository : IPhotoRepository
{
    private readonly ApplicationDbContext _context;

    public PhotoRepository(ApplicationDbContext context)
    {
        _context = context;
    }


    public async Task<bool> SavePhotoToUserAsync(Photo? toSavePhoto,AppUser user)
    {
        user.Photos.Add(toSavePhoto);
        return await SaveAsync();
    }

    public async Task<bool> SavePhotoToEventAsync(Photo? toSavePhoto, Event currentEvent)
    {
        currentEvent.Photos.Add(toSavePhoto);
        return await SaveAsync();
    }

    public async Task<bool> DeletePhoto(Photo photoToRemove, AppUser user)
    {
        user.Photos.Remove(photoToRemove);
        return await SaveAsync();
    }


    public async Task<Photo> FindPhoto(string photoId, AppUser user)
    {
        var photoToRemove = user.Photos.FirstOrDefault(p => p.Id == photoId);
        return photoToRemove ?? null;
    }

    public async Task<bool> SaveAsync()
    {
        return await _context.SaveChangesAsync() > 0;
    }
}