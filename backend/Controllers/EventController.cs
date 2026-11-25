using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RSVPeople.Api.Models;
using RSVPeople.Api.Dtos;
using RSVPeople.Api.Data;
using System.Security.Cryptography;

namespace RSVPeople.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EventController : ControllerBase
{
    private readonly AppDbContext _db;

    public EventController(AppDbContext db)
    {
        _db = db;
    }

    // GET /api/events
    [HttpGet]
    public async Task<ActionResult<List<EventResponse>>> GetAllEvents()
    {
        var events = await _db.Events
            .Select(e => new EventResponse(
                e.EventId,
                e.OrganizerId,
                e.EventCode,
                e.EventName,
                e.EventDesc,
                e.EventLocation,
                e.EventDate,
                e.EventCreateTime,
                e.Organizer,
                e.Rsvps
            ))
            .ToListAsync();

        return Ok(events);
    }

    // GET /api/events/{organizerId}
    [HttpGet("organizerId")]
    public async Task<ActionResult<List<EventResponse>>> GetEventsByOrganizerId(int organizerId)
    {
        var user = await _db.Users.FindAsync(organizerId);

        if (user is null)
        {
            return NotFound(new { message = "User not found." });
        }
        
        else if (user.Role != "organizer")
        {
            return Unauthorized(new { message = "User does not have organizer permissions." });
        }

        var events = await _db.Events
            .Where(e => e.OrganizerId == organizerId)
            .Select(e => new EventResponse(
                e.EventId,
                e.OrganizerId,
                e.EventCode,
                e.EventName,
                e.EventDesc,
                e.EventLocation,
                e.EventDate,
                e.EventCreateTime,
                e.Organizer,
                e.Rsvps
            ))
            .ToListAsync();

        return Ok(events);
    }

    // GET /api/events/{eventId}
    [HttpGet("eventId")]
    public async Task<ActionResult<EventResponse>> GetEventById(int eventId)
    {
        var curEvent = await _db.Events.FindAsync(eventId);

        if (curEvent is null)
        {
            return NotFound(new { message = "Event not found." });
        }

        var newEvent = new EventResponse(
            curEvent.EventId,
            curEvent.OrganizerId,
            curEvent.EventCode,
            curEvent.EventName,
            curEvent.EventDesc,
            curEvent.EventLocation,
            curEvent.EventDate,
            curEvent.EventCreateTime,
            curEvent.Organizer,
            curEvent.Rsvps
            );

        return Ok(newEvent);
    }

    // GET /api/events/{eventCode}
    [HttpGet("eventCode")]
    public async Task<ActionResult<EventResponse>> GetEventByCode(string eventCode)
    {
        var curEvent = await _db.Events
            .Where(e => e.EventCode == eventCode)
            .Select(e => new EventResponse(
                e.EventId,
                e.OrganizerId,
            e.EventCode,
            e.EventName,
            e.EventDesc,
            e.EventLocation,
            e.EventDate,
            e.EventCreateTime,
            e.Organizer,
            e.Rsvps
            ))
            .FirstOrDefaultAsync();
        
        if (curEvent is null)
        {
            return NotFound(new { message = "Event not found." });
        }

        return Ok(curEvent);
    }

    // POST /api/events
    [HttpPost("createEvent")]
    public async Task<ActionResult<EventResponse>> CreateEvent(CreateEventRequest request)
    {
        var organizerId = request.OrganizerId;

        var idCheck = await _db.Users.FindAsync(organizerId);
        
        if (idCheck is null)
        {
            return NotFound(new { message = "Event creator not found." });
        }
        else if (idCheck.Role != "organizer")
        {
            return Unauthorized(new { message = "User does not have organizer permissions." });
        }
        else if (idCheck.Id != organizerId)
        {
            return Conflict(new { message = "User id does not match." });
        }

        const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
        string code;

        do
        {
            code = string.Empty;

            for (int i = 0; i < 10; i++)
            {
                code += chars[RandomNumberGenerator.GetInt32(chars.Length)];
            }
        }
        while (await _db.Events.AnyAsync(e => e.EventCode == code));

        var newEvent = new Event
        {
            OrganizerId = organizerId,
            EventCode = code.Trim(),
            EventName = request.EventName.Trim(),
            EventDesc = request.EventDesc.Trim(),
            EventLocation = request.EventLocation.Trim(),
            EventDate = request.EventDate,
            EventCreateTime = DateTime.UtcNow,
            Organizer = idCheck,
            Rsvps = request.Rsvps
        };

        _db.Events.Add(newEvent);
        await _db.SaveChangesAsync();

        var returnEvent = new EventResponse(
            newEvent.EventId,
            newEvent.OrganizerId,
            newEvent.EventCode,
            newEvent.EventName,
            newEvent.EventDesc,
            newEvent.EventLocation,
            newEvent.EventDate,
            newEvent.EventCreateTime,
            newEvent.Organizer,
            newEvent.Rsvps
        );

        return Ok(returnEvent);
    }

    // PUT /api/events/{eventId}
    [HttpPut("eventId")]
    public async Task<ActionResult<EventResponse>> UpdateEvent(int eventId, UpdateEventRequest request)
    {
        var curEvent = await _db.Events.FindAsync(eventId);

        if (curEvent is null)
        {
            return NotFound(new { message = "Event not found." });
        }

        if (!string.IsNullOrWhiteSpace(request.EventName))
        {
            curEvent.EventName = request.EventName.Trim();
        }

        if (!string.IsNullOrWhiteSpace(request.EventDesc))
        {
            curEvent.EventDesc = request.EventDesc.Trim();
        }

        if (!string.IsNullOrWhiteSpace(request.EventLocation))
        {
            curEvent.EventLocation = request.EventLocation.Trim();
        }

        if (request.EventDate.HasValue)
        {
            curEvent.EventDate = request.EventDate.Value;
        }

        await _db.SaveChangesAsync();

        var returnEvent = new EventResponse(
            curEvent.EventId,
            curEvent.OrganizerId,
            curEvent.EventCode,
            curEvent.EventName,
            curEvent.EventDesc,
            curEvent.EventLocation,
            curEvent.EventDate,
            curEvent.EventCreateTime,
            curEvent.Organizer,
            curEvent.Rsvps
        );

        return Ok(returnEvent);
    }

    // DELETE /api/events/{eventId}
    [HttpDelete("eventId")]
    public async Task<ActionResult> DeleteEvent(int eventId)
    {
        var curEvent = await _db.Events.FindAsync(eventId);

        if (curEvent is null)
        {
            return NotFound(new { message = "Event not found." });
        }

        _db.Events.Remove(curEvent);
        await _db.SaveChangesAsync();

        return NoContent();
    }
}