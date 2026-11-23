using System;
using System.ComponentModel.DataAnnotations;

namespace RSVPeople.Api.Models;

public class RSVP
{
    [Key]
    public int RsvpId { get; set; }

    [Required]
    public int EventId { get; set; }

    // Nullable so guests / "+1" invites can RSVP without an account
    public int? AttendeeId { get; set; }

    [Required, MaxLength(100)]
    public string AttendeeName { get; set; } = string.Empty;

    [Required, MaxLength(100)]
    public string ContactInfo { get; set; } = string.Empty;

    public string? DietaryRestrictions { get; set; }

    public DateTime RegisteredAt { get; set; } = DateTime.UtcNow;

    public Event Event { get; set; } = null!;
    public User? Attendee { get; set; }
}