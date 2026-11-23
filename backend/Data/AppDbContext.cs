using Microsoft.EntityFrameworkCore;
using RSVPeople.Api.Models;
using System;
using System.Reflection.Emit;

namespace RSVPeople.Api.Data;
public class AppDbContext : DbContext
{
   public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<User> Users => Set<User>();
    public DbSet<Event> Events => Set<Event>();
    public DbSet<RSVP> Rsvps => Set<RSVP>();
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
       modelBuilder.Entity<User>()
            .HasIndex(u => u.Email)
            .IsUnique();

        modelBuilder.Entity<Event>()
            .HasIndex(e => e.EventCode)
            .IsUnique();
        modelBuilder.Entity<Event>()
            .HasOne(e => e.Organizer)
            .WithMany(u => u.Events)
            .HasForeignKey(e => e.OrganizerId)
            .OnDelete(DeleteBehavior.Cascade);
        modelBuilder.Entity<RSVP>()
            .HasOne(r => r.Event)
            .WithMany(e => e.Rsvps)
            .HasForeignKey(r => r.EventId)
            .OnDelete(DeleteBehavior.Cascade);
        modelBuilder.Entity<RSVP>()
            .HasOne(r => r.Attendee)
            .WithMany(u => u.Rsvps)
            .HasForeignKey(r => r.AttendeeId)
            .OnDelete(DeleteBehavior.SetNull);
    }


        
}
