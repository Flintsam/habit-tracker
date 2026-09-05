# habit-tracker
django habit and mood tracker
# Habit Tracker

A Django-based habit and mood tracker built as part of my hands-on software development learning project.

## Current Progress

* Django project created
* `habits` app created
* SQLite database configured
* Initial habit models created
* Django migrations applied
* Basic URL routing and view created
* Project runs locally with Django's development server
* Git repository initialized

## Tech Stack

* Python
* Django
* SQLite
* Git & GitHub

## Running Locally

1. Clone the repository:

```bash
git clone git@github.com:Flintsam/habit-tracker.git
```

2. Navigate into the project:

```bash
cd habit-tracker
```

3. Create and activate a virtual environment:

```bash
python -m venv venv
```

Windows PowerShell:

```powershell
.\venv\Scripts\Activate.ps1
```

4. Install dependencies:

```bash
pip install django
```

5. Run migrations:

```bash
python manage.py migrate
```

6. Start the development server:

```bash
python manage.py runserver
```

7. Open:

```text
http://127.0.0.1:8000/
```

## Project Structure

```text
habit-tracker/
├── config/
├── habits/
├── manage.py
├── .gitignore
└── README.md
```

## Status

🚧 Currently under development.
