from django.contrib.auth.mixins import LoginRequiredMixin
from django.http.response import JsonResponse
from django.views.generic import (ListView, CreateView, UpdateView, DetailView)
from .forms import (CreateRestaurantForm, EditRestaurantForm)
from django.core.exceptions import ObjectDoesNotExist
from django.urls import reverse
from django.views.decorators.http import require_GET
from .models import Restaurant
from OrderFood.models import OrderFood
from Food_basket.models import Basket


# TODO
# class CreateLocationView(LoginRequiredMixin, CreateView):
#     template_name = 'Location/location_form.html'
#     model = Location
#     fields = '__all__'

#     def get_success_url(self):
#         return reverse('Restaurants:view_location')


# class LocationView(LoginRequiredMixin, ListView):
#     model = Location
#     template_name = 'Location/locations_list_view.html'
#     paginate_by = 6


# class UpdateLocationView(LoginRequiredMixin, UpdateView):
#     model = Location
#     fields = '__all__'
#     template_name = 'Location/location_form.html'

#     def get_success_url(self):
#         return reverse('Restaurants:view_location')


class CreateRestaurantView(LoginRequiredMixin, CreateView):
    model = Restaurant
    form_class = CreateRestaurantForm
    template_name = 'Restaurants/restaurant_form.html'

    def form_valid(self, form):
        form.instance.owner = self.request.user
        return super().form_valid(form)

    def get_success_url(self):
        return reverse('Restaurants:view_location')


def RestaurantGetListView(request, **kwargs):
    print(kwargs)
    pass


@require_GET
def RestaurantGetDiscountList(request, **kwargs) -> list[dict]:
    """
    Returns either all the discounted restaurants, or a certain number, 
    the results are also sorted decresingly based on their max_discount

    Args:
        request (): The request comes from either a user or Anonymous

    Returns:
        list[dict]: The data is returned in a dict format
    """
    dicRestaurant = Restaurant.objects.filter(
        best_discount__gt=0).order_by('best_discount')
    ratings = [restaurant.getRatings for restaurant in dicRestaurant]
    rating_user = [restaurant.getRatingUser(
        request.user) for restaurant in dicRestaurant]
    dicRestaurant = dicRestaurant.values('id', 'name', 'best_discount', 'main_image',
                                         'is_open')
    if kwargs["number_of"] == "all":
        for index, restaurant in enumerate(dicRestaurant):
            restaurant["rating"] = ratings[index]
            restaurant["rating_user"] = rating_user[index]
    else:
        dicRestaurant = dicRestaurant[0:int(kwargs["number_of"])]
        for index, restaurant in enumerate(dicRestaurant):
            restaurant["rating"] = ratings[index]
            restaurant["rating_user"] = rating_user[index]
    return JsonResponse(list(dicRestaurant), safe=False)


class homeView(ListView):
    model = Restaurant
    template_name = 'Restaurants/restaurant_list_view.html'


class DetailRestaurantView(DetailView):
    model = Restaurant
    template_name = 'Restaurants/restaurant_detail_view.html'

    def get_context_data(self, **kwargs):
        context = super(DetailRestaurantView, self).get_context_data(**kwargs)
        try:
            restaurant = Restaurant.objects.get(id=self.kwargs['pk'])

            if not self.request.user.is_anonymous:
                food_basket = Basket.objects.get(
                    restaurant=restaurant, user=self.request.user, sent=False)
            else:
                food_basket = None
            ordered = OrderFood.objects.filter(food_basket=food_basket)
        except ObjectDoesNotExist:
            ordered = OrderFood.objects.none()
        context['orders'] = ordered
        return context


class UpdateRestaurantView(UpdateView):
    model = Restaurant
    form_class = EditRestaurantForm
    template_name = 'Restaurants/restaurant_update_view.html'
