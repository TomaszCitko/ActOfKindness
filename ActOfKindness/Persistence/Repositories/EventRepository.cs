using Domain.Models;
using Microsoft.EntityFrameworkCore;
using Persistence.Repositories.Interfaces;

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
        return await _context.Events.ToListAsync();
    }

    public async Task<Event> GetEventById(Guid id)
    {
        return await _context.Events.FindAsync(id);
    }

    public async Task DeleteEvent(Guid id)
    {
        await _context.Events.Where(e => e.Id == id)
            .ExecuteDeleteAsync();
    }

    public async Task CreateEvent(Event newEvent)
    {
        await _context.Events.AddAsync(newEvent);
    }

    public async Task UpdateEvent(Guid id, Event entity)
    {
        await _context.Events.Where(e => e.Id == id)
            .ExecuteUpdateAsync(prop => 
                prop.SetProperty(e => e.Title, entity.Title)
                .SetProperty(e => e.Description, entity.Description)
                .SetProperty(e => e.Localization, entity.Localization)
                .SetProperty(e => e.IsOnline, entity.IsOnline)
                .SetProperty(e => e.StartingDate, entity.StartingDate)
                .SetProperty(e => e.EndingDate, entity.EndingDate)
                .SetProperty(e => e.Latitude, entity.Latitude)
                .SetProperty(e => e.Longitude, entity.Longitude)
                .SetProperty(e => e.Image, entity.Image)
            );
    }

    public async Task Save()
    {
        await _context.SaveChangesAsync();
    }
}