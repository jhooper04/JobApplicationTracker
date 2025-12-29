# Job Application Tracker

A full-stack web application built with Next.js and TypeScript to track job applications, interviews, and follow-ups.

## Tech Stack
- Next.js (App Router)
- React
- TypeScript
- API Routes
- Relational Database (Postgres)

## Features
- Create, update, and delete job applications
- Track application status and interview stages
- Server-side data fetching using Next.js server components
- Form validation and type-safe data handling

## Architecture Notes
- Uses Next.js App Router with a clear separation of server and client components
- API routes handle all data persistence and validation
- Frontend components consume RESTful endpoints
- Emphasis on maintainable, readable component structure

## Getting Started

First clone the repository with `git clone https://github.com/jhooper04/JobApplicationTracker.git`

### Option A: Run with Docker (Recommended)

This project includes a Docker Compose setup for consistent and quick local development.

```bash
docker-compose up
```

The application will be available at http://localhost:3000

### Option B: Run Locally Without Docker

To run the application locally without Docker, you will need a running PostgreSQL instance.

Prerequisites:
- Node.js (v18+ recommended)
- PostgreSQL (v14+)
- npm or yarn

1. Create the Database

Create a PostgreSQL database for the application:
```sql
-- 1. Create a new database
CREATE DATABASE job_tracker;

-- 2. Create a new user with a password
CREATE USER job_tracker_user WITH PASSWORD 'Password123!';

-- 3. Grant all privileges on the database to the user
GRANT ALL PRIVILEGES ON DATABASE job_tracker TO job_tracker_user;

-- 4. Make the user the owner of the database
-- This gives full control, including schema creation
ALTER DATABASE job_tracker OWNER TO job_tracker_user;
```

2. Configure Environment Variables

Create a .env.local file in the project root:
```env
DATABASE_URL=postgresql://job_tracker_user:Password123!@localhost:5432/job_tracker
```

3. Install dependencies, migrate database, and start the development server

```bash
npm install && npm run migrate && npm run dev
```

The application will be available at http://localhost:3000
