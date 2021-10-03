from django.urls import path
from .views import (AddMenuItemView,
                    DeleteMenuItemView,
                    UpdateMenuItemView,
                    GetBasicImagePhoto,
                    GetItems)

app_name = 'Food'

urlpatterns = [
    path('add_item', AddMenuItemView, name='add_food'),
    path('delete_item', DeleteMenuItemView, name='delete_item'),
    path('update_item/', UpdateMenuItemView.as_view(), name='update_item'),
    path('get_basic_item', GetBasicImagePhoto, name='basic_item_image'),
    path('get_items/<int:pk>/', GetItems, name="get_items"),
]
