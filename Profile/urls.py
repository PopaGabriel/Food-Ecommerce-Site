from django.urls import path
from .views import (ViewProfileUser,
                    CreateProfileUser,
                    UpdateProfileView)

app_name = 'Profile'

urlpatterns = [
    path('view_profile/', ViewProfileUser.as_view(), name='see_profile'),
    path('create_profile/', CreateProfileUser.as_view(), name='create_profile'),
    path('update_profile/', UpdateProfileView.as_view(), name='update_profile'),
]