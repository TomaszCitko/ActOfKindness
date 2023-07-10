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


    public async Task<bool> SavePhoto(Photo? toSavePhoto,AppUser user)
    {
        user.Photos.Add(toSavePhoto);
        var result = await _context.SaveChangesAsync() > 0;
        return result;
    }

    public async Task<bool> DeletePhoto(Photo photoToRemove, AppUser user)
    {
        user.Photos.Remove(photoToRemove);
        var result = await _context.SaveChangesAsync() > 0;
        return result;
    }


    public async Task<Photo> FindPhoto(string photoId, AppUser user)
    {
        var photoToRemove = user.Photos.FirstOrDefault(p => p.Id == photoId);
        return photoToRemove ?? null;
    }

}