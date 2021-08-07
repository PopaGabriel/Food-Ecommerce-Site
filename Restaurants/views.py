from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import (ListView,
                                  CreateView,
                                  UpdateView,
                                  DetailView)
from .forms import (CreateRestaurantForm,
                    EditRestaurantForm)
from django.urls import reverse
from .models import Location, Restaurant


class CreateLocationView(LoginRequiredMixin, CreateView):
    template_name = 'Location/location_form.html'
    model = Location
    fields = '__all__'

    def get_success_url(self):
        return reverse('Restaurants:view_location')


class LocationView(LoginRequiredMixin, ListView):
    model = Location
    template_name = 'Location/locations_list_view.html'
    # paginate_by = 20


class UpdateLocationView(LoginRequiredMixin, UpdateView):
    model = Location
    fields = '__all__'
    template_name = 'Location/location_form.html'

    def get_success_url(self):
        return reverse('Restaurants:view_location')


class CreateRestaurantView(LoginRequiredMixin, CreateView):
    model = Restaurant
    form_class = CreateRestaurantForm
    template_name = 'Restaurants/restaurant_form.html'

    def form_valid(self, form):
        form.instance.owner = self.request.user
        return super().form_valid(form)

    def get_success_url(self):
        return reverse('Restaurants:view_location')


class RestaurantView(ListView):
    model = Restaurant
    template_name = 'Restaurants/restaurant_list_view.html'


class DetailRestaurantView(DetailView):
    model = Restaurant
    template_name = 'Restaurants/restaurant_detail_view.html'


class UpdateRestaurantView(UpdateView):
    model = Restaurant
    form_class = EditRestaurantForm
    template_name = 'Restaurants/restaurant_update_view.html'
