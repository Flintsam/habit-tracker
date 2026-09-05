# Habit Tracker

A web-based habit and mood tracking application designed to help users build consistent habits, record their progress, and understand their daily patterns.

## ✨ Features

* Track daily habits
* Record habit-specific activities
* Track reading progress
* Track running and exercise activities
* Record gym sessions
* Track daily mood
* View and manage habit entries
* Store habit data in a database
* REST API for interacting with habit data
* Automated testing
* External API integration

## 🏋️ Supported Habits

### Gym

Record:

* Date
* Muscle group
* Time spent
* Notes

### 📚 Reading

Record:

* Date
* Book title
* Pages read
* Time spent
* Notes

### 🏃 Running

Record:

* Date
* Distance
* Time spent
* Notes

## 🛠️ Tech Stack

### Backend

* Python
* Django
* Django REST Framework

### Frontend

* HTML
* CSS
* JavaScript

### Database

* SQLite

### Development

* Git
* GitHub

## 🏗️ Architecture

The application follows a client-server architecture.

```text
Browser
   ↓
JavaScript
   ↓
REST API
   ↓
Django / Django REST Framework
   ↓
Database
```

The frontend communicates with the Django backend through REST API endpoints, which handle creating, retrieving, updating, and deleting habit data.

## 📂 Project Structure

```text
habit-tracker/
│
├── config/
│   ├── settings.py
│   ├── urls.py
│   ├── asgi.py
│   └── wsgi.py
│
├── habits/
│   ├── migrations/
│   ├── models.py
│   ├── views.py
│   ├── admin.py
│   └── tests.py
│
├── manage.py
├── README.md
└── .gitignore
```

## 📌 Project Status

🚧 **Currently under development**

The project is being developed incrementally, with the backend API, frontend interface, database functionality, testing, and external API integration being added over time.

## 🎯 Future Improvements

* Habit statistics and visualizations
* Improved mood tracking
* Progress dashboards
* More habit types
* Better filtering and search
* API authentication
* Deployment to a production server
