using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RSVPeople.Api.Data;
using RSVPeople.Api.Models;

namespace RSVPeople.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RsvpsController(AppDbContext db) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<RsvpEntry>>> GetAll()
    {
        var items = await db.Rsvps
            .OrderByDescending(r => r.CreatedAt)
            .ToListAsync();
        return Ok(items);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<RsvpEntry>> GetById(int id)
    {
        var item = await db.Rsvps.FindAsync(id);
        return item is null ? NotFound() : Ok(item);
    }

    [HttpPost]
    public async Task<ActionResult<RsvpEntry>> Create(RsvpEntry input)
    {
        input.Id = 0;
        input.CreatedAt = DateTime.UtcNow;
        db.Rsvps.Add(input);
        await db.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = input.Id }, input);
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<RsvpEntry>> Update(int id, RsvpEntry input)
    {
        var existing = await db.Rsvps.FindAsync(id);
        if (existing is null)
        {
            return NotFound();
        }

        existing.Name = input.Name;
        existing.Email = input.Email;
        existing.Status = input.Status;
        existing.GuestsCount = input.GuestsCount;
        existing.DietaryNotes = input.DietaryNotes;

        await db.SaveChangesAsync();
        return Ok(existing);
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var existing = await db.Rsvps.FindAsync(id);
        if (existing is null)
        {
            return NotFound();
        }

        db.Rsvps.Remove(existing);
        await db.SaveChangesAsync();
        return NoContent();
    }
}
