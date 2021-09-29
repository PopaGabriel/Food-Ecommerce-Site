import json

from django.core.exceptions import ObjectDoesNotExist
from django.shortcuts import render, get_object_or_404
from django.http import HttpResponseRedirect, JsonResponse
from django.urls import reverse_lazy

from Reviews.models import Review
from Restaurants.models import Restaurant


def LikeViewRestaurantList(request):
    restaurant = get_object_or_404(Restaurant, id=request.POST.get('post_id'))
    if restaurant.likes.filter(id=request.user.id).exists():
        restaurant.likes.remove(request.user)
    else:
        restaurant.likes.add(request.user)

    if restaurant.dislikes.filter(id=request.user.id).exists():
        restaurant.dislikes.remove(request.user)

    return HttpResponseRedirect(reverse_lazy('home'))


def DislikeViewRestaurantList(request):
    restaurant = get_object_or_404(Restaurant, id=request.POST.get('post_id'))
    if restaurant.dislikes.filter(id=request.user.id).exists():
        restaurant.dislikes.remove(request.user)
    else:
        restaurant.dislikes.add(request.user)

    if restaurant.likes.filter(id=request.user.id).exists():
        restaurant.likes.remove(request.user)

    return HttpResponseRedirect(reverse_lazy('home'))


def LikeViewReview(request, **kwargs):
    data = json.loads(request.body)
    message = {}
    try:
        review = Review.objects.get(id=data['review'])
        if data['action'] == 'like':
            if review.likes.filter(id=request.user.id).exists():
                review.likes.remove(request.user)
            else:
                review.likes.add(request.user)

            if review.dislikes.filter(id=request.user.id).exists():
                review.dislikes.remove(request.user)
        elif data['action'] == 'dislike':
            if review.dislikes.filter(id=request.user.id).exists():
                review.dislikes.remove(request.user)
            else:
                review.dislikes.add(request.user)

            if review.likes.filter(id=request.user.id).exists():
                review.likes.remove(request.user)
        else:
            return JsonResponse('Not an accepted command', safe=False)
    except ObjectDoesNotExist:
        return JsonResponse('Error could not find', safe=False)

    message['likes'] = review.likes.count()
    message['dislikes'] = review.dislikes.count()
    return JsonResponse(message, safe=False)
