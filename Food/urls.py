from django.urls import path, include
from .views import (AddMenuItemView,
                    DeleteMenuItemView,
                    UpdateMenuItemView,)

app_name = 'Food'

urlpatterns = [
    path('add_item/', AddMenuItemView.as_view(), name='add_food'),
    path('delete_item/', DeleteMenuItemView.as_view(), name='delete_item'),
    path('update_item/', UpdateMenuItemView.as_view(), name='update_item'),
]