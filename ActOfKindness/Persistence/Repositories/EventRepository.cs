using Application.Dtos.Event;
using Application.Dtos.User;
using Application.Exceptions;
using Application.Interfaces;
using Domain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Protocols;

namespace Persistence.Repositories;

public class EventRepository : IEventRepository
{
    private readonly ApplicationDbContext _context;

    public EventRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<Event>> GetModeratedEventsAsync()
    { 
        return await _context.Events.Where(e => e.IsModerated).ToListAsync();
    }

    public async Task<List<Event>> GetUnmoderatedEventsAsync()
    {
        return await _context.Events.Where(e => !e.IsModerated).ToListAsync();
    }

    public async Task<Event?> GetEventByIdAsync(Guid id)
    {
        return await _context.Events.FindAsync(id);
    }

    public async Task DeleteEventAsync(Guid id)
    {
        await _context.Events.Where(e => e.Id == id)
            .ExecuteDeleteAsync();
    }

    public async Task CreateEventAsync(Event newEvent)
    {
        await _context.Events.AddAsync(newEvent);
    }

    public async Task UpdateEventAsync(Guid id, EditEventDto eventDto)
    {
        await _context.Events.Where(e => e.Id == id)
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

    public async Task<int> ModerateEventAsync(Guid id)
    {
        return await _context.Events.Where(e => e.Id == id)
            .ExecuteUpdateAsync(prop=> 
                prop.SetProperty(e => e.IsModerated, true));
    }

    public async Task SaveAsync()
    {
        await _context.SaveChangesAsync();
    }

    public async Task<List<Event>> GetFilteredModeratedEventsAsync(EventFilter filter)
    {
        var filteredEvents = await _context.Events.Where(e => e.IsModerated).ToListAsync();

        if (!string.IsNullOrEmpty(filter.Localization))
        {
            filteredEvents = filteredEvents.Where(e => e.Localization.ToLower().Contains(filter.Localization.ToLower())).ToList();
        }
        if (!string.IsNullOrEmpty(filter.Type.ToString()))
        {
            filteredEvents = filteredEvents.Where(e => e.Type == filter.Type).ToList();
        }
        if (!string.IsNullOrEmpty(filter.StartingDate.ToString()))
        {
            filteredEvents = filteredEvents.Where(e => e.StartingDate > filter.StartingDate).ToList();
        }
        if (!string.IsNullOrEmpty(filter.EndingDate.ToString()))
        {
            filteredEvents = filteredEvents.Where(e => e.EndingDate < filter.EndingDate).ToList();
        }
        if (!string.IsNullOrEmpty(filter.IsOnline.ToString()))
        {
            filteredEvents = filteredEvents.Where(e => e.IsOnline == filter.IsOnline).ToList();
        }
        if (!string.IsNullOrEmpty(filter.Title))
        {
            filteredEvents = filteredEvents.Where(e => e.Title.ToLower().Contains(filter.Title.ToLower())).ToList();
        }
        if (!string.IsNullOrEmpty(filter.Description))
        {
            filteredEvents = filteredEvents.Where(e => e.Description.ToLower().Contains(filter.Description.ToLower())).ToList();
        }

        return filteredEvents;
    }
}