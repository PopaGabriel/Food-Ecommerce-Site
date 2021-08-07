from django.urls import path, include

from .views import (AddSectionView,
                    AddMenuView,
                    DeleteSectionView,
                    DeleteMenuView,
                    UpdateSectionView)

app_name = 'Menu'

urlpatterns = [
    path('add_section/', AddSectionView.as_view(), name='add_section'),
    path('add_menu/', AddMenuView.as_view(), name='add_menu'),
    path('delete_menu/', DeleteMenuView.as_view(), name='delete_menu'),
    path('delete_section/', DeleteSectionView.as_view(), name='delete_section'),
    path('update_section/', UpdateSectionView.as_view(), name='update_section'),
    path('Food/', include('Food.urls')),
]
