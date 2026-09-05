from django.db import models

class Habit(models.Model):
    name=models.CharField(max_length=20)
class Gym(models.Model):
    habit = models.ForeignKey(Habit, on_delete=models.CASCADE)
    date = models.DateField()
    muscle_group = models.CharField(max_length=20)
    time_spent = models.DurationField()
    notes = models.TextField(blank=True, null=True)

class Reading(models.Model):
    habit = models.ForeignKey(Habit, on_delete=models.CASCADE)
    date = models.DateField()
    book_title = models.CharField(max_length=100)
    pages_read = models.IntegerField()
    time_spent = models.DurationField()
    notes = models.TextField(blank=True, null=True)

class Running(models.Model):
    habit = models.ForeignKey(Habit, on_delete=models.CASCADE)
    date = models.DateField()
    distance = models.FloatField()
    number_of_steps = models.IntegerField()
    time_spent = models.DurationField()
    notes = models.TextField(blank=True, null=True)

