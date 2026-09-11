from django.test import TestCase
from django.core.exceptions import ValidationError
from rest_framework.test import APIClient

from .models import Habit, Entry


class EntryModelTest(TestCase):

    def test_invalid_mood_is_rejected(self):
        habit = Habit.objects.create(name="Gym")

        entry = Entry(
            habit=habit,
            date="2026-09-10",
            completed=True,
            mood=6
        )

        with self.assertRaises(ValidationError):
            entry.full_clean()


class EntryAPITest(TestCase):
    def test_get_habits(self):
        Habit.objects.create(name="Gym")

        response = self.client.get("/api/habits/")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["name"], "Gym")
    
    

    def test_create_entry_api(self):
        habit = Habit.objects.create(name="Gym")

        client = APIClient()

        response = client.post(
            "/api/entries/",
            {
                "habit": habit.id,
                "date": "2026-09-10",
                "completed": True,
                "mood": 4
            },
            format="json"
        )

        self.assertEqual(response.status_code, 201)

        self.assertTrue(
            Entry.objects.filter(
                habit=habit,
                mood=4
            ).exists()
        )
