from django.urls import path, include

from .views import (AddMenuView,
                    DeleteMenuView)

app_name = 'Menu'

urlpatterns = [
    path('add_menu/', AddMenuView.as_view(), name='add_menu'),
    path('delete_menu/', DeleteMenuView.as_view(), name='delete_menu'),
    path('Food/', include('Food.urls')),
]
