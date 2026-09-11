
# Habit Tracker
 
A full-stack habit-tracking web application, built as the Week 1 (Software Development) project in a structured 6-week hands-on career exploration plan. Users can create habits, log daily entries (completion status + mood rating), track streaks and progress, and view their history — all backed by a real REST API.
 
 
## Features
 
- Create, list, and manage habits with a category (Gym / Reading / Running / Other)
- Log daily entries per habit — date, completed status, mood rating (1–5)
- View habit streaks and per-habit completion progress
- Delete entries, with confirmation before deletion
- Full CRUD REST API (GET, POST, PUT, PATCH, DELETE) for Habits and Entries
- Nested serialization — fetching a habit includes its related entries inline
- Filtering entries by habit
- Server-side third-party API integration (daily motivational quote), with:
  - Request timeout and graceful failure handling (returns a controlled `503`, never crashes)
  - 24-hour server-side caching to avoid hitting the external API on every load
  - API key stored in environment variables, never hardcoded or exposed to the frontend
- Django admin for direct data management
- Automated backend tests (model validation + API behavior)
- Dark/light theme toggle
- Responsive, styled UI built from scratch with plain CSS (no framework)
- In-UI error and empty states (no browser `alert()` popups)

## Tech Stack
 
**Backend:** Python, Django, Django REST Framework, SQLite (development database), `python-dotenv`, `django-cors-headers`

**Frontend:** HTML, CSS, vanilla JavaScript (`fetch`, `async`/`await`) — no frontend framework

**Other:** Git/GitHub (branch + merge workflow), Django's built-in test framework and caching
 
## Architecture
 
Django follows the MVT (Model-View-Template) pattern on the backend, exposed as a REST API consumed by a fully decoupled static frontend.
 
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
 
- **Habit** — `id`, `name`, `category`
- **Entry** — `id`, `habit` (ForeignKey → Habit), `date`, `completed`, `mood`
Kept intentionally simple: one generic `Habit` model with a related `Entry` model (rather than a separate model per habit type), so new habit types can be added without any code changes — just a new database row.
 
## Project Structure
 
```
habit-tracker/
├── config/              # Django project settings, root URLs
├── habits/               # Django app: models, serializers, views, admin, tests
│   ├── models.py
│   ├── serializers.py
│   ├── views.py
│   ├── urls.py
│   ├── admin.py
│   └── tests.py
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── app.js
├── manage.py
├── requirements.txt
├── .env                  # not committed — see Setup below
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
| GET | `/api/randomquote/` | Server-fetched, cached daily quote |

 
## What This Project Was For
 
This isn't a polished production app — it's a deliberate, scoped learning exercise. The goal was to genuinely experience the full loop of software development in one week: data modeling, building and testing a REST API, connecting a frontend to it, integrating and safely handling a third-party service, debugging a real bug methodically, and working through a proper git branch/merge workflow (including resolving an actual merge conflict) — not just following a tutorial to a finished result.