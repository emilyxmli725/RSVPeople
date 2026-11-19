# RSVPeople

Full-stack application with an **ASP.NET Core (.NET 10) Web API** backend, **Entity Framework Core + SQLite** SQL database, and a **React + TypeScript + Vite + Tailwind CSS v4** frontend.

## Project Structure

- `RSVPeople.sln` — .NET Solution file
- `backend/` — ASP.NET Core Web API (`RSVPeople.Api`)
  - `Models/RsvpEntry.cs` — Entity model for guest RSVPs
  - `Data/AppDbContext.cs` — EF Core `DbContext` with seed data
  - `Controllers/RsvpsController.cs` — REST CRUD endpoints (`/api/rsvps`)
  - `Program.cs` — DI setup, CORS policy, OpenAPI, and automatic SQLite database creation (`rsvpeople.db`)
- `frontend/` — React 19 + TypeScript + Vite + Tailwind CSS v4
  - `src/App.tsx` — Dashboard for viewing, adding, and deleting RSVPs
  - `vite.config.ts` — Configured with `@tailwindcss/vite` and `/api` proxy to `http://localhost:5141`

## Running Locally

### 1. Start the .NET Backend
```powershell
cd backend
dotnet run
```
The API will start at `http://localhost:5141` (and automatically create/seed `rsvpeople.db`).
- Endpoint: `http://localhost:5141/api/rsvps`
- OpenAPI spec: `http://localhost:5141/openapi/v1.json`

### 2. Start the React Frontend
In a second terminal:
```powershell
cd frontend
npm install
npm run dev
```
Open `http://localhost:5173` in your browser.
