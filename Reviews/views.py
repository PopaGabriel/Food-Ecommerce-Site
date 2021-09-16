import json
from Restaurants.models import Restaurant
from django.contrib.auth.decorators import login_required
from django.core.exceptions import ObjectDoesNotExist
from django.http import JsonResponse
from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import (UpdateView)
from Profile.models import Profile
import Restaurants.models
from .models import Review
from .forms import BaseReviewForm


@login_required()
def AddReview(request):
    try:
        data = json.loads(request.body)
        restaurant = Restaurants.models.Restaurant.objects.get(id=data['restaurant'])

        review = Review.objects.create()
        review.author = request.user
        review.title = data['title']
        review.body = data['body']
        review.mark = int(data['mark'])
        review.restaurant = restaurant

        if len(review.title) == 0 or len(review.body) == 0:
            return JsonResponse('error', safe=False)

        review.save()

        if Profile.objects.filter(user=request.user).exists():
            img = request.user.profile.main_image
        else:
            img = '/static/images/basic_business_icon.png'
        return JsonResponse({'review': review.id, 'image': img, 'email': request.user.email}, safe=False)
    except ObjectDoesNotExist:
        return JsonResponse('error', safe=False)
    except KeyError:
        return JsonResponse('error', safe=False)


class UpdateReview(LoginRequiredMixin, UpdateView):
    model = Review
    form_class = BaseReviewForm
    template_name = 'reviews/update_review_form.html'


@login_required()
def DeleteViewReview(request):
    data = json.loads(request.body)
    try:
        Review.objects.get(id=data['id'], author=request.user).delete()
    except ObjectDoesNotExist:
        return JsonResponse('Error not deleted', safe=False)
    return JsonResponse('Deleted', safe=False)