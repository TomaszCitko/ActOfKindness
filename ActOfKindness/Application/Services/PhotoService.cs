using Application.Dtos.Photo;
using Application.Interfaces;
using AutoMapper;
using Domain.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using System.Security.Principal;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.EntityFrameworkCore;

namespace Application.Services;

public class PhotoService : IPhotoService
{
    private readonly IPhotoRepository _photoRepository;
    private readonly IMapper _mapper;
    private readonly IContextService _contextService;
    private readonly UserManager<AppUser> _userManager;

    private readonly Cloudinary _cloudinary;

    public PhotoService(IOptions<CloudinarySetup> config, UserManager<AppUser> userManager, IContextService contextService, IMapper mapper, IPhotoRepository photoRepository)
    {
        _userManager = userManager;
        _contextService = contextService;
        _mapper = mapper;
        _photoRepository = photoRepository;

        var myAccount = new Account(
            config.Value.CloudName,
            config.Value.ApiKey,
            config.Value.ApiSecret
        );
        _cloudinary = new Cloudinary(myAccount);
    }

    public async Task<PhotoUpload?> AddPhoto(IFormFile file)
    {
        if (file.Length <= 0) return null;

        await using var stream = file.OpenReadStream();
        var toUpload = new ImageUploadParams
        {
            File = new FileDescription(file.FileName, stream),
            Transformation = new Transformation()
                .Height(1920)
                .Width(1080)
                .Crop("fill")
        };
        var result = await _cloudinary.UploadAsync(toUpload);
        if (result.Error != null)
        {
            throw new Exception(result.Error.Message);
        }

        return new PhotoUpload
        {
            PublicId = result.PublicId,
            Url = result.SecureUrl.ToString(),
        };
    }

    public async Task<string?> DeletePhoto(string photoId)
    {
        var toDelete = new DeletionParams(photoId);
        var result = await _cloudinary.DestroyAsync(toDelete);
        return result.Result == "ok" ? result.Result : null;
    }

    public async Task<Photo?> SavePhotoToUserAsync(IFormFile file)
    {
        var currentUserId = _contextService.GetUserId;
        if (currentUserId is null) return null;

        var currentUser = await _userManager.Users
                .Include(u => u.Photos)
                .FirstOrDefaultAsync(u => u.Id == currentUserId);
        if (currentUser is null) return null;

        var photoUploadResult = await AddPhoto(file);

        if (photoUploadResult is null) return null;

        var toSavePhoto = new Photo
        {
            Url = photoUploadResult.Url,
            Id = photoUploadResult.PublicId,
        };

        if (currentUser!.Photos.Any(x=>x.IsMain))
        {
            toSavePhoto.IsMain = true;
        }

        var save = await _photoRepository.SavePhoto(toSavePhoto, currentUser);

        return save ? toSavePhoto : null;
    }

    public async Task<string?> DeletePhotoFromUserAsync(string photoId)
    {
        var currentUserId = _contextService.GetUserId;
        if (currentUserId is null) return null;

        var currentUser =
            await _userManager.Users
                .Include(x => x.Photos)
                .FirstOrDefaultAsync(u => u.Id == currentUserId);

        if (currentUser is null) return null;

        
        var photoToRemove = await _photoRepository.FindPhoto(photoId, currentUser);
        if (photoToRemove is null) return null;

        var result = await DeletePhoto(photoId);

        if (result is null) return null;

        var save = await _photoRepository.DeletePhoto(photoToRemove, currentUser);

        return save ? "success" : null;

    }
}