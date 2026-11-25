using System.ComponentModel.DataAnnotations;

using RSVPeople.Api.Models;

namespace RSVPeople.Api.Dtos;

public record CreateEventRequest(
    [Required] int OrganizerId,
    [Required, MaxLength(10)] string EventCode,
    [Required, MaxLength(150)] string EventName,
    string EventDesc,
    [Required, MaxLength(200)] string EventLocation,
    [Required] DateTime EventDate,
    DateTime EventCreateTime,
    User Organizer,
    ICollection<RSVP> Rsvps
);

public record UpdateEventRequest(
    [MaxLength(150)] string? EventName,
    string? EventDesc,
    [MaxLength(200)] string? EventLocation,
    DateTime? EventDate
);

public record EventResponse(
    int EventId,
    int OrganizerId,
    string EventCode,
    string EventName,
    string? EventDesc,
    string EventLocation,
    DateTime EventDate,
    DateTime EventCreateTime,
    User Organizer,
    ICollection<RSVP> Rsvps
);
