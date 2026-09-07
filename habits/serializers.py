from rest_framework import serializers
from .models import Habit,Entry

class EntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Entry
        fields = ['id', 'habit', 'date', 'completed', 'mood']
class HabitSerializer(serializers.ModelSerializer):
    entries = EntrySerializer(many=True, read_only=True)

    class Meta:
        model = Habit
        fields = ['id', 'name','entries']
