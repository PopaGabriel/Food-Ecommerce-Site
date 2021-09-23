from django.urls import path
from .views import (GetIngredients)

app_name = 'ingredient'

urlpatterns = [
    path('get_ingredients/<str:name>', GetIngredients, name='get_ingredients'),
]
