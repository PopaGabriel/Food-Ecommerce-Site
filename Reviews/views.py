import json
from Restaurants.models import Restaurant
from django.contrib.auth.decorators import login_required
from django.core.exceptions import ObjectDoesNotExist
from django.http import HttpResponseRedirect, JsonResponse
from django.shortcuts import render
from django.contrib.auth.mixins import LoginRequiredMixin
from django.urls import reverse_lazy
from django.views.generic import (DeleteView,
                                  UpdateView)
from Profile.models import Profile
import Restaurants.models
from .models import Review
from .forms import BaseReviewForm


@login_required()
def AddReview(request):
    data = json.loads(request.body)
    try:
        restaurant = Restaurants.models.Restaurant.objects.get(id=data['restaurant'])
    except ObjectDoesNotExist:
        return JsonResponse('error', safe=False)
    review = Review.objects.create()
    review.author = request.user
    review.title = data['title']
    review.body = data['body']
    review.mark = int(data['mark'])
    review.restaurant = restaurant
    review.save()
    if Profile.objects.filter(user=request.user).exists():
        img = request.user.profile.main_image
    else:
        img = '/static/images/basic_business_icon.png'
    return JsonResponse({'review': review.id, 'image': img, 'email': request.user.email}, safe=False)


class UpdateReview(LoginRequiredMixin, UpdateView):
    model = Review
    form_class = BaseReviewForm
    template_name = 'reviews/update_review_form.html'


class DeleteReview(LoginRequiredMixin, DeleteView):
    model = Review
    template_name = 'reviews/delete_review.html'

    def get_success_url(self):
        return reverse_lazy('home')


@login_required
def AddReviewToReview(request, **kwargs):
    pass