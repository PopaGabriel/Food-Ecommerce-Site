from .views import AddReviewItem
from django.urls import path

app_name = "RatingItem"

urlpatterns = [
    path("add_review/item=<int:id>&&mark=<int:mark>&&target_type=<str:type>",
         AddReviewItem, name="add_review"),
]
