using System;
using System.ComponentModel.DataAnnotations;

namespace RSVPeople.Api.Models;

public class Event
{
    [Key]
    public int EventId { get; set; }

    [Required]
    public int OrganizerId { get; set; }

    [Required, MaxLength(10)]
    public string EventCode { get; set; } = string.Empty;

    [Required, MaxLength(150)]
    public string EventName { get; set; } = string.Empty;

    public string? EventDesc { get; set; }

    [Required, MaxLength(200)]
    public string EventLocation { get; set; } = string.Empty;

    [Required]
    public DateTime EventDate { get; set; }

    public DateTime EventCreateTime { get; set; } = DateTime.UtcNow;

    public User Organizer { get; set; } = null!;
    public ICollection<RSVP> Rsvps { get; set; } = new List<RSVP>();

}
