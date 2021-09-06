from django.urls import path
from .views import (LikeViewRestaurantList,
                    DislikeViewRestaurantList,
                    LikeViewReview)

app_name = 'Likes&Dislikes'

urlpatterns = [
    path('like_restaurant', LikeViewRestaurantList, name='like_restaurant'),
    path('dislike_restaurant', DislikeViewRestaurantList, name='dislike_restaurant'),
    path('like_dislike_review', LikeViewReview, name='dislike_review'),
]
