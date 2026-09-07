from django.urls import path
from .views import habit_list,entry_list,habit_detail,entry_detail

urlpatterns = [
    path('habits/', habit_list),
    path('entries/', entry_list),
    path('habits/<int:pk>/', habit_detail),
    path('entries/<int:pk>/', entry_detail),
]
