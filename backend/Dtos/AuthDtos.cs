using System.ComponentModel.DataAnnotations;

namespace RSVPeople.Api.Dtos;

public record SignupRequest(
    [Required, EmailAddress] string Email,
    [Required, MinLength(6)] string Password,
    [Required] string FirstName,
    [Required] string LastName,
    string Role = "attendee" // "org" or "attendee"
);

public record LoginRequest(
    [Required, EmailAddress] string Email,
    [Required] string Password
);

public record UserResponse(
    int Id,
    string Email,
    string FirstName,
    string LastName,
    string Role
);