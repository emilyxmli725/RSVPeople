using Microsoft.EntityFrameworkCore;

namespace RSVPeople.Api.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    // Add your DbSet<T> properties here
}
