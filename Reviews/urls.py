from django.urls import path
from .views import (AddReview,
                    UpdateReview,
                    DeleteReview,)

app_name = 'Reviews'
urlpatterns = [
    path('add_review/', AddReview.as_view(), name='add_review'),
    path('update_review/', UpdateReview.as_view(), name='update_review'),
    path('delete_review/', DeleteReview.as_view(), name='delete_review'),
    # path('update_review/', UpdateReview.as_view(), name='delete_review'),
]