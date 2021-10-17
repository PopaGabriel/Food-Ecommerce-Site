from django.urls import path, include
from .views import (
    DetailRestaurantView,
    CreateRestaurantView,
    RestaurantGetDiscountList,
    UpdateRestaurantView,
    RestaurantGetListView)

app_name = 'Restaurants'

urlpatterns = [
    path('add_restaurant/', CreateRestaurantView.as_view(), name='add_restaurant'),
    path('Restaurant_view/<int:pk>',
         DetailRestaurantView.as_view(), name='detail_restaurant'),
    path('restaurant_edit/<int:pk>',
         UpdateRestaurantView.as_view(), name='update_restaurant'),
    path('restaurant_get_discounts/number_of=<str:number_of>',
         RestaurantGetDiscountList, name='get_discount_list'),
    path('Menu/', include('Menu.urls')),
    path('Reviews/', include('Reviews.urls')),
    path('Restaurant_view/', include('Food_basket.urls')),
]
