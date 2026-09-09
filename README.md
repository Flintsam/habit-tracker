# Habit Tracker

A full-stack habit-tracking application built as part of a hands-on Software Development exploration project. Users can create habits, log daily entries against them (completed status + mood rating), and view their history — all backed by a real REST API.

This project is part of a 6-week structured career exploration plan covering Software, Data, AI, and Cloud — Week 1 focuses on experiencing real full-stack software development.

## Features (as of Day 3)

- Create and list habits
- Log entries against a habit (date, completed status, mood rating 1–5)
- View entry history per habit
- Full CRUD REST API (GET, POST, PUT, PATCH, DELETE) for both Habits and Entries
- Nested serialization — fetching a habit includes its related entries inline
- Filtering entries by habit (`/api/entries/?habit=<id>`)
- Django admin interface for direct data management
- Frontend built with plain HTML, CSS, and vanilla JavaScript (no frameworks)
- Client-side + server-side validation
- Graceful handling of network failures and HTTP error responses
- CORS configured to allow the frontend to communicate with the API

## Tech Stack

**Backend:** Python, Django, Django REST Framework, SQLite (development database)
**Frontend:** HTML, CSS, vanilla JavaScript (`fetch`, `async`/`await`)
**Other:** django-cors-headers, Git/GitHub

## Architecture

The project follows Django's MVT (Model-View-Template) pattern on the backend, exposed as a REST API consumed by a fully decoupled static frontend.

```
HTML form
   ↓
JavaScript (fetch)
   ↓
Django REST Framework API
   ↓
SQLite database
   ↓
JSON response
   ↓
JavaScript
   ↓
DOM update
```

### Data model

- **Habit** — `id`, `name`
- **Entry** — `id`, `habit` (ForeignKey → Habit), `date`, `completed`, `mood`

Kept intentionally simple: one generic `Habit` model with a related `Entry` model, rather than a separate model per habit type, so new habit types can be added without any code changes — just a new database row.

## Project Structure

```
habit-tracker/
├── config/              # Django project settings, root URLs
├── habits/              # Django app: models, serializers, views, admin
│   ├── models.py
│   ├── serializers.py
│   ├── views.py
│   ├── urls.py
│   └── admin.py
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── app.js
├── manage.py
├── requirements.txt
└── .gitignore
```

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/habits/` | List all habits |
| POST | `/api/habits/` | Create a habit |
| GET | `/api/habits/<id>/` | Retrieve a habit (with nested entries) |
| GET | `/api/entries/` | List all entries (supports `?habit=<id>` filter) |
| POST | `/api/entries/` | Create an entry |
| GET | `/api/entries/<id>/` | Retrieve a single entry |
| PUT / PATCH | `/api/entries/<id>/` | Update an entry |
| DELETE | `/api/entries/<id>/` | Delete an entry |

## Development Status

**Completed (Days 1–3):**
- Project setup, models, migrations, git/GitHub setup
- Full REST API with nested serialization and filtering
- Frontend built and fully wired to the API
- CORS, error handling, and client-side validation

**In progress / upcoming:**
- Server-side third-party API integration (quote of the day)
- Automated backend tests
- Debugging practice + git branch workflow
- Deployment (Docker + AWS) — planned for a later phase of the exploration

## Notes

This project is a learning artifact built as part of a deliberate, hands-on exploration process — the scope is intentionally kept minimal (e.g. one generic `Entry` model rather than per-habit-type fields) to stay focused on core full-stack concepts rather than feature completeness.