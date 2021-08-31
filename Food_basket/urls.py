from django.urls import path
from .views import UpdateBasket

app_name = 'FoodBasket'

urlpatterns = [
    path('update_basket/', UpdateBasket, name='update_basket'),
]