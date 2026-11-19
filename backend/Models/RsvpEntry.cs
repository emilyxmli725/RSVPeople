using System.ComponentModel.DataAnnotations;

namespace RSVPeople.Api.Models;

public class RsvpEntry
{
    public int Id { get; set; }

    [Required]
    [MaxLength(120)]
    public string Name { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    [MaxLength(200)]
    public string Email { get; set; } = string.Empty;

    [Required]
    [MaxLength(30)]
    public string Status { get; set; } = "Attending"; // Attending, Maybe, Declined

    public int GuestsCount { get; set; } = 1;

    [MaxLength(500)]
    public string? DietaryNotes { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
