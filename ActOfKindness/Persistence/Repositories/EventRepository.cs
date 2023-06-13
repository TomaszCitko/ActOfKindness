using System.Diagnostics;
using System.Security.Cryptography.X509Certificates;
using Azure.Core;
using Domain.Interfaces;
using Domain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

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

    public async Task<Event> GetEventById(int id)
    {
        return await _context.Events.FindAsync(id);
    }

    public async Task DeleteEvent(int id)
    {
        var eventToRemove = await _context.Events.FirstOrDefaultAsync(e => e.Id == id);
        _context.Events.Remove(eventToRemove);
    }

    public async Task CreateEvent(Event newEvent)
    {
        await _context.Events.AddAsync(newEvent);
    }

    public async Task UpdateEvent(int id, Event entity)
    {
        _context.Events.Update(entity);
    }

    public async Task Save()
    {
        await _context.SaveChangesAsync();
    }
}