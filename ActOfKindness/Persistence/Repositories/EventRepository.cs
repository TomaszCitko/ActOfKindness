using Application.Dtos.Event;
using Application.Interfaces;
using Domain.Models;
using Microsoft.EntityFrameworkCore;
using System.Globalization;

namespace Persistence.Repositories;

public class EventRepository : IEventRepository
{
    private readonly ApplicationDbContext _context;

    public EventRepository(ApplicationDbContext context)
    {
        _context = context;
    }
    
    public async Task<List<Event>> GetModeratedEventsAsync(int pageNumber, int pageSize)
    {
        return await _context.Events
            .Include(e => e.CreatedBy)
            .Where(e => e.IsModerated && !e.IsDone)
            .OrderBy(e => e.StartingDate)
            .Skip(pageSize * (pageNumber - 1))
            .Take(pageSize)
            .ToListAsync();
    }    
    
    public async Task<List<Event>> GetUserEventsAsync(string username)
    {
        return await _context.Events
            .Include(e => e.CreatedBy)
            .Where(e => e.CreatedBy.UserName == username)
            .OrderBy(e => e.StartingDate)
            .ToListAsync();

    }

    public async Task<int> GetQuantityOfModeratedEventAsync()
    {
        return await _context.Events
            .CountAsync(e => e.IsModerated && !e.IsDone);
    }

    public async Task<List<Event>> GetUnmoderatedEventsAsync()
    {
        return await _context.Events
            .Where(e => !e.IsModerated)
            .Include(e => e.CreatedBy)
            .OrderBy(e => e.CreatedTime)
            .ToListAsync();
    }

    public async Task<Event?> GetEventByIdAsync(Guid id)
    {
        return await _context.Events
            .Include(i => i.Participants)
            .ThenInclude(u=>u.User)
            .Include(i => i.CreatedBy)
            //.Include(i=>i.Comments)
            //.ThenInclude(a=>a.Author)
            .Include(i=>i.Photos)
            .FirstOrDefaultAsync(e => e.Id == id);
    }

    public async Task<Event?> GetEventByIdForComments(Guid id)
    {
        return await _context.Events
            .Include(i => i.Participants)
            .ThenInclude(u => u.User)
            .Include(i => i.CreatedBy)
            .Include(i => i.Comments)
            .ThenInclude(a => a.Author)
            .Include(i => i.Photos)
            .FirstOrDefaultAsync(e => e.Id == id);
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
        var startingDate = DateTime.ParseExact(eventDto.StartingDate, "dd/MM/yyyy", CultureInfo.InvariantCulture);
        var endingDate = DateTime.ParseExact(eventDto.EndingDate, "dd/MM/yyyy", CultureInfo.InvariantCulture);

        await _context.Events.Where(e => e.Id == id)
            .ExecuteUpdateAsync(prop => 
                prop.SetProperty(e => e.Title, eventDto.Title)
                .SetProperty(e => e.Description, eventDto.Description)
                .SetProperty(e => e.Localization, eventDto.Localization)
                .SetProperty(e => e.IsOnline, eventDto.IsOnline)
                .SetProperty(e => e.StartingDate, startingDate)
                .SetProperty(e => e.EndingDate, endingDate)
                .SetProperty(e => e.Latitude, eventDto.Latitude)
                .SetProperty(e => e.Longitude, eventDto.Longitude)
                .SetProperty(e => e.IsModerated, false)
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
        var filteredEvents = await _context.Events
            .Include(e => e.CreatedBy)
            .Where(e => e.IsModerated && !e.IsDone)
            .OrderBy(e => e.StartingDate)
            .ToListAsync();

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
            filteredEvents = filteredEvents.Where(e => e.StartingDate <= filter.StartingDate && filter.StartingDate <= e.EndingDate).ToList();
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