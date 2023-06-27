using Application.Dtos.Event;
using Application.Dtos.User;
using Application.Exceptions;
using Application.Interfaces;
using Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace Persistence.Repositories;

public class EventRepository : IEventRepository
{
    private readonly ApplicationDbContext _context;

    public EventRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<Event>> GetEvents()
    { 
        var testAwait = await _context.Events.ToListAsync();
        return testAwait;
    }

    public async Task<Event?> GetEventById(Guid id)
    {
        return await _context.Events.FindAsync(id);
    }

    public async Task<int> DeleteEvent(Guid id)
    {
        return await _context.Events.Where(e => e.Id == id)
            .ExecuteDeleteAsync();
    }

    public async Task CreateEvent(Event newEvent)
    {
        await _context.Events.AddAsync(newEvent);
    }

    public async Task<int> UpdateEvent(Guid id, EditEventDto eventDto)
    {
        return await _context.Events.Where(e => e.Id == id)
            .ExecuteUpdateAsync(prop => 
                prop.SetProperty(e => e.Title, eventDto.Title)
                .SetProperty(e => e.Description, eventDto.Description)
                .SetProperty(e => e.Localization, eventDto.Localization)
                .SetProperty(e => e.IsOnline, eventDto.IsOnline)
                .SetProperty(e => e.StartingDate, eventDto.StartingDate)
                .SetProperty(e => e.EndingDate, eventDto.EndingDate)
                .SetProperty(e => e.Latitude, eventDto.Latitude)
                .SetProperty(e => e.Longitude, eventDto.Longitude)
                .SetProperty(e => e.Image, eventDto.Image)
            );
    }

    public async Task Save()
    {
        await _context.SaveChangesAsync();
    }
    public async Task<AppUser?> GetUserById(Guid id)
    {
        return await _context.Users.FindAsync(id);
    }

}