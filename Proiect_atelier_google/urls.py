from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from Restaurants import views as homepage

app_name = 'home_app'

urlpatterns = [
    path('', homepage.RestaurantView.as_view(), name='home'),
    path('admin/', admin.site.urls),
    path('Restaurants/', include('Restaurants.urls')),
    path('accounts/', include('CustomUsers.urls'), name='signup'),
    path('profile/<int:pk>/', include('Profile.urls')),
    path('likes/<int:pk>/', include('Likes&Dislikes.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
