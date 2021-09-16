from django.urls import path
from .views import (AddReview,
                    UpdateReview,
                    DeleteViewReview)

app_name = 'Reviews'
urlpatterns = [
    path('add_review/', AddReview, name='add_review'),
    path('update_review/', UpdateReview.as_view(), name='update_review'),
    path('delete_review/', DeleteViewReview, name='delete_review'),
    # path('update_review/', UpdateReview.as_view(), name='update_review'),
]
