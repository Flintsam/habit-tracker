from django.db import models

from django.db import models


class Habit(models.Model):
    name = models.CharField(max_length=100)


class Entry(models.Model):
    habit = models.ForeignKey(
        Habit,
        on_delete=models.CASCADE,
        related_name="entries"
    )
    date = models.DateField()
    completed = models.BooleanField(default=False)
    mood = models.IntegerField()  # 1–5