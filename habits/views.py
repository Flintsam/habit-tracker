
from django.http import HttpResponse
import requests
from django.conf import settings
from django.core.cache import cache
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Habit,Entry
from .serializers import HabitSerializer,EntrySerializer


def home(request):
    return HttpResponse("Hello from my habit tracker!")
@api_view(['GET', 'POST'])
def habit_list(request):
    if request.method == 'POST':
        serializer = HabitSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    habits = Habit.objects.all()
    serializer = HabitSerializer(habits, many=True)
    return Response(serializer.data)


@api_view(['GET', 'POST'])
def entry_list(request):
    if request.method == 'POST':
        serializer = EntrySerializer(data=request.data)
        if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    habit_id = request.query_params.get('habit')

    if habit_id:
        entries = Entry.objects.filter(habit_id=habit_id)
    else:
        entries = Entry.objects.all()

    serializer = EntrySerializer(entries, many=True)

    return Response(serializer.data)



@api_view(['GET', 'PUT', 'PATCH', 'DELETE'])
def habit_detail(request, pk):
    try:
        habit = Habit.objects.get(pk=pk)
    except Habit.DoesNotExist:
        return Response({"error": "Habit not found"}, status=404)

    if request.method == 'GET':
        serializer = HabitSerializer(habit)
        return Response(serializer.data)

    if request.method == 'PUT':
        serializer = HabitSerializer(habit, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=400)

    if request.method == 'PATCH':
        serializer = HabitSerializer(
            habit,
            data=request.data,
            partial=True
        )

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=400)

    if request.method == 'DELETE':
        habit.delete()
        return Response(status=204)
@api_view(['GET', 'PUT', 'PATCH', 'DELETE'])
def entry_detail(request, pk):
    try:
        entry = Entry.objects.get(pk=pk)
    except Entry.DoesNotExist:
        return Response({"error": "Entry not found"}, status=404)

    if request.method == 'GET':
        serializer = EntrySerializer(entry)
        return Response(serializer.data)

    if request.method == 'PUT':
        serializer = EntrySerializer(entry, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=400)

    if request.method == 'PATCH':
        serializer = EntrySerializer(
            entry,
            data=request.data,
            partial=True
        )

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=400)

    if request.method == 'DELETE':
        entry.delete()
        return Response(status=204)
    
@api_view(['GET'])
def random_quote(request):
    cached_quote = cache.get("daily_quote")

    if cached_quote:
        return Response(cached_quote)


    url = settings.API_NINJAS_URL

    headers = {
        "X-Api-Key": settings.API_NINJAS_KEY
    }

    try:
        response = requests.get(url, headers=headers, timeout=5)
        response.raise_for_status()

        quote_data = response.json()
        
        cache.set("daily_quote", quote_data, 60 * 60 * 24)

        return Response(quote_data)
    except requests.exceptions.RequestException as error:
        print("QUOTE API ERROR:", error)


        return Response(
            {"error": "Unable to fetch quote right now."},
            status=503
        )