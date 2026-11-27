using System.ComponentModel.DataAnnotations;

namespace RSVPeople.Api.DTOs;

public record UserResponse(
    int Id,
    string Email,
    string FirstName,
    string LastName,
    string Role,
    DateTime DateCreated
);

public record UpdateUserRequest(
    [EmailAddress] string? Email,
    string? FirstName,
    string? LastName,
    [MinLength(6)] string? Password
);