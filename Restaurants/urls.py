from django.urls import path, include
from .views import (CreateLocationView,
                    LocationView,
                    DetailRestaurantView,
                    UpdateLocationView,
                    CreateRestaurantView,
                    UpdateRestaurantView,)

app_name = 'Restaurants'

urlpatterns = [
    path('add_location/', CreateLocationView.as_view(), name='add_location'),
    path('view_location/', LocationView.as_view(), name='view_location'),
    path('location_update/<int:pk>/', UpdateLocationView.as_view(), name='location_update'),
    path('add_restaurant/', CreateRestaurantView.as_view(), name='add_restaurant'),
    path('Restaurant_view/<int:pk>', DetailRestaurantView.as_view(), name='detail_restaurant'),
    path('restaurant_edit/<int:pk>', UpdateRestaurantView.as_view(), name='update_restaurant'),
    path('Restaurant_view/<int:pk>/Menu/', include('Menu.urls')),
    path('Restaurant_view/<int:pk>/Review/', include('Reviews.urls')),
]
