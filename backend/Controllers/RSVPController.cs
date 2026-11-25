using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RSVPeople.Api.Models;
using RSVPeople.Api.DTOs;
using RSVPeople.Api.Data;

namespace RSVPeople.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RSVPController : ControllerBase
{
    private readonly AppDbContext _db;

    public RSVPController(AppDbContext db)
    {
        _db = db;
    }

    
}