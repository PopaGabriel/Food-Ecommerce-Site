from django.urls import path
from .views import (AddReview,
                    UpdateReview,
                    DeleteReview,
                    AddReviewToReview)

app_name = 'Reviews'
urlpatterns = [
    path('add_review/', AddReview, name='add_review'),
    path('update_review/', UpdateReview.as_view(), name='update_review'),
    path('delete_review/', DeleteReview.as_view(), name='delete_review'),
    path('<int:id_message>/add_review/', AddReviewToReview, name='add_review_comments'),
    # path('update_review/', UpdateReview.as_view(), name='update_review'),
    # path('delete_review/', DeleteReview.as_view(), name='delete_review'),
]