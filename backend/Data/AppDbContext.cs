using Microsoft.EntityFrameworkCore;
using RSVPeople.Api.Models;

namespace RSVPeople.Api.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<RsvpEntry> Rsvps => Set<RsvpEntry>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<RsvpEntry>().HasData(
            new RsvpEntry
            {
                Id = 1,
                Name = "Alex Rivera",
                Email = "alex.rivera@example.com",
                Status = "Attending",
                GuestsCount = 2,
                DietaryNotes = "Vegetarian",
                CreatedAt = new DateTime(2026, 11, 15, 18, 0, 0, DateTimeKind.Utc)
            },
            new RsvpEntry
            {
                Id = 2,
                Name = "Jordan Chen",
                Email = "jordan.chen@example.com",
                Status = "Maybe",
                GuestsCount = 1,
                DietaryNotes = "None",
                CreatedAt = new DateTime(2026, 11, 16, 14, 30, 0, DateTimeKind.Utc)
            },
            new RsvpEntry
            {
                Id = 3,
                Name = "Taylor Morgan",
                Email = "taylor.m@example.com",
                Status = "Declined",
                GuestsCount = 0,
                DietaryNotes = null,
                CreatedAt = new DateTime(2026, 11, 17, 9, 15, 0, DateTimeKind.Utc)
            }
        );
    }
}
