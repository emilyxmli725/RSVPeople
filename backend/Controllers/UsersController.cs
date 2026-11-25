using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RSVPeople.Api.Models;
using RSVPeople.Api.DTOs;
using RSVPeople.Api.Data;

namespace RSVPeople.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext _db;
        private readonly PasswordHasher<User> _hasher = new();

        public UsersController(AppDbContext db)
        {
            _db = db;
        }
        // GET /api/users
        [HttpGet]
        public async Task<ActionResult<List<UserResponse>>> GetAllUsers()
        {
            var users = await _db.Users
                .Select(u => new UserResponse(u.Id, u.Email, u.FirstName, u.LastName, u.Role, u.CreatedAt))
                .ToListAsync();

            return Ok(users);
        }
        
        // GET /api/users/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<UserResponse>> GetUserById(int id)
        {
            var user = await _db.Users.FindAsync(id);
            if (user is null)
                return NotFound(new { message = "User not found." });

            return Ok(new UserResponse(user.Id, user.Email, user.FirstName, user.LastName, user.Role, user.CreatedAt));
        }
        // PUT /api/users/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult<UserResponse>> UpdateUser(int id, UpdateUserRequest request)
        {
            var user = await _db.Users.FindAsync(id);
            if (user is null)
                return NotFound(new { message = "User not found." });

            if (!string.IsNullOrWhiteSpace(request.Email))
            {
                var normalizedEmail = request.Email.Trim().ToLower();
                var emailTaken = await _db.Users.AnyAsync(u => u.Email == normalizedEmail && u.Id != id);
                if (emailTaken)
                    return Conflict(new { message = "Email is already in use." });

                user.Email = normalizedEmail;
            }

            if (!string.IsNullOrWhiteSpace(request.FirstName))
                user.FirstName = request.FirstName.Trim();

            if (!string.IsNullOrWhiteSpace(request.LastName))
                user.LastName = request.LastName.Trim();

            if (!string.IsNullOrWhiteSpace(request.Password))
                user.PasswordHash = _hasher.HashPassword(user, request.Password);

            await _db.SaveChangesAsync();

            return Ok(new UserResponse(user.Id, user.Email, user.FirstName, user.LastName, user.Role, user.CreatedAt));
        }

        // DELETE /api/users/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _db.Users.FindAsync(id);
            if (user is null)
                return NotFound(new { message = "User not found." });

            _db.Users.Remove(user);
            await _db.SaveChangesAsync();

            return NoContent();
        }
    }
}