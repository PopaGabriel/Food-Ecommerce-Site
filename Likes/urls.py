from django.urls import path
from .views import LikeViewRestaurantList

app_name = 'Likes'

urlpatterns = [
    path('like_restaurant', LikeViewRestaurantList, name='like_restaurant')
]