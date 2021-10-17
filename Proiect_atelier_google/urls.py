from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from django.views.generic.base import RedirectView
from django.contrib.staticfiles.storage import staticfiles_storage
from Restaurants import views as homepage

app_name = 'home_app'

urlpatterns = [
    path('', homepage.homeView.as_view(), name='home'),
    path('admin/', admin.site.urls),
    path('Restaurants/', include('Restaurants.urls')),
    path('accounts/', include('CustomUsers.urls'), name='signup'),
    path('profile/<int:pk>/', include('Profile.urls')),
    # path('likes/', include('Likes&Dislikes.urls')),
    path('section/', include('Section.urls')),
    path('ingredients/', include('Ingredients.urls')),
    path('ratings/', include('RatingsItem.urls')),
    path('favicon.ico', RedirectView.as_view(
        url=staticfiles_storage.url('images/icon/favicon.ico')))
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
