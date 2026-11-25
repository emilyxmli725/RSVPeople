using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RSVPeople.Api.Data;
using RSVPeople.Api.Dtos;
using RSVPeople.Api.Models;

namespace RSVPeople.Api.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _db;
    private readonly PasswordHasher<User> _hasher = new();

    public AuthController(AppDbContext db)
    {
        _db = db;
    }

    [HttpPost("signup")]
    public async Task<ActionResult<UserResponse>> Signup(SignupRequest request)
    {
        var email = request.Email.Trim().ToLower();

        if (await _db.Users.AnyAsync(u => u.Email == email))
            return Conflict(new { message = "Email is already registered." });

        var user = new User
        {
            Email = email,
            FirstName = request.FirstName.Trim(),
            LastName = request.LastName.Trim(),
            Role = request.Role.ToLower() == "org" ? "org" : "attendee"
        };
        user.PasswordHash = _hasher.HashPassword(user, request.Password);
        _db.Users.Add(user); 
        await _db.SaveChangesAsync(); 




        return Ok(new UserResponse(user.Id, user.Email, user.FirstName, user.LastName, user.Role));
    }

    [HttpPost("login")]
    public async Task<ActionResult<UserResponse>> Login(LoginRequest request)
    {
        var email = request.Email.Trim().ToLower();
        var user = await _db.Users.FirstOrDefaultAsync(u => u.Email == email);

       if (user is null)
            return Unauthorized(new { message = "Invalid email or password." });

        var result = _hasher.VerifyHashedPassword(user, user.PasswordHash, request.Password);
        if (result == PasswordVerificationResult.Failed)
            return Unauthorized(new { message = "Invalid email or password." });
        return Ok(new UserResponse(user.Id, user.Email, user.FirstName, user.LastName, user.Role));
    }
}