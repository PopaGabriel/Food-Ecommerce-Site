from .views import AddReviewItem
from django.urls import path

app_name = "RatingItem"

urlpatterns = [
    path("add_review/item=<int:id>&&mark=<int:mark>",
         AddReviewItem, name="add_review"),
]
