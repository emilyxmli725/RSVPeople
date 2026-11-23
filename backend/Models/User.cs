using System;
using System.ComponentModel.DataAnnotations;

namespace RSVPeople.Api.Models;

public class User
{
    [Key]
    public int Id { get; set; }
    [Required, MaxLength(255)]
    public string Email { get; set; } = string.Empty;
    [Required]
    public string PasswordHash { get; set; } = string.Empty;

    [Required, MaxLength(100)]
    public string FirstName { get; set; } = string.Empty;
    [Required, MaxLength(100)]
    public string LastName { get; set; } = string.Empty;

    [Required, MaxLength(20)]
    public string Role { get; set; } = "attendee"; // Default role is "attendee", other role is "organizer"

    public string RefreshToken { get; set; }
    public string refeshTokenExpiryTime { get; set; }
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public ICollection<Event> Events { get; set; } = new List<Event>();
    public ICollection<RSVP> Rsvps { get; set; } = new List<RSVP>();

}

