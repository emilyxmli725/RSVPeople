# RSVPeople

Full-stack template with an **ASP.NET Core (.NET 10) Web API** backend, **Entity Framework Core + SQLite** SQL database, and a **React + TypeScript + Vite + Tailwind CSS v4** frontend.

## Project Structure

- `RSVPeople.sln` — .NET Solution file
- `backend/` — ASP.NET Core Web API (`RSVPeople.Api`)
  - `Data/AppDbContext.cs` — Empty EF Core `DbContext`
  - `Controllers/` — Place API controllers here
  - `Program.cs` — DI setup, CORS policy, OpenAPI, and SQLite database wiring (`rsvpeople.db`)
- `frontend/` — React 19 + TypeScript + Vite + Tailwind CSS v4
  - `src/App.tsx` — Root React component
  - `vite.config.ts` — Configured with `@tailwindcss/vite` and `/api` proxy to `http://localhost:5141`

## Running Locally

### 1. Start the .NET Backend
```powershell
cd backend
dotnet run
```

### 2. Start the React Frontend
```powershell
cd frontend
npm run dev
```
