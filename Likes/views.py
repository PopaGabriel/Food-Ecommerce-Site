from django.shortcuts import render, get_object_or_404
from django.http import HttpResponseRedirect
from django.urls import reverse_lazy
from Restaurants.models import Restaurant


def LikeViewRestaurantList(request, pk):
    restaurant = get_object_or_404(Restaurant, id=request.POST.get('post_id'))
    if restaurant.likes.filter(id=request.user.id).exists():
        restaurant.likes.remove(request.user)
    else:
        restaurant.likes.add(request.user)
    return HttpResponseRedirect(reverse_lazy('home'))

