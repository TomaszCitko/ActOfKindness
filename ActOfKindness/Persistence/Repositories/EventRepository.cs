using Application.Dtos.Event;
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

    public async Task<List<Event>> GetModeratedEvents()
    { 
        return await _context.Events.Where(e => e.IsModerated).ToListAsync();
    }

    public async Task<List<Event>> GetUnmoderatedEvents()
    {
        return await _context.Events.Where(e => !e.IsModerated).ToListAsync();
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

    public async Task<int> ModerateEvent(Guid id)
    {
        return await _context.Events.Where(e => e.Id == id)
            .ExecuteUpdateAsync(prop=> 
                prop.SetProperty(e => e.IsModerated, true));
    }

    public async Task Save()
    {
        await _context.SaveChangesAsync();
    }
}