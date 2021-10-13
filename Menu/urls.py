from django.urls import path, include
from .views import (AddMenuView, DeleteMenuView, GetMenuView, UpdateMenuView)

app_name = 'Menu'

urlpatterns = [
    path('add_menu/', AddMenuView, name='add_menu'),
    path('delete_menu/', DeleteMenuView, name='delete_menu'),
    path('get_menus/<int:restaurant_id>', GetMenuView, name="get_menus"),
    path('update_menu/<int:restaurant_id>',
         UpdateMenuView, name='update_menu'),
    path('Food/', include('Food.urls')),
]
