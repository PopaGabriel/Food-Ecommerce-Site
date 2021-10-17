from django.contrib.auth.decorators import login_required
from django.core.exceptions import ObjectDoesNotExist
from django.views.decorators.http import require_POST
from django.http import JsonResponse
from Food.models import MenuItem

from RatingsItem.models import Ratings
from Restaurants.models import Restaurant


@require_POST
@login_required()
def AddReviewItem(request, **kwargs):
    try:
        print(kwargs)
        if request.method == "POST":
            if kwargs["type"] == "food":
                rating, created = Ratings.objects.get_or_create(
                    author=request.user, food_id=kwargs["id"])
                rating.mark = kwargs["mark"]
                if kwargs["mark"] == 0:
                    if not created:
                        rating.delete()
                else:
                    rating.save()
                return JsonResponse(MenuItem.objects.get(id=kwargs["id"]).getRatings, safe=False)
            elif kwargs["type"] == "restaurant":
                print(kwargs["id"])
                rating, created = Ratings.objects.get_or_create(
                    author=request.user, food=None, restaurant_id=kwargs["id"])
                rating.mark = kwargs["mark"]
                if kwargs["mark"] == 0:
                    if not created:
                        rating.delete()
                else:
                    rating.save()
                return JsonResponse(Restaurant.objects.get(id=kwargs["id"]).getRatings, safe=False)
    except ObjectDoesNotExist:
        return JsonResponse(MenuItem.objects.get(id=kwargs["id"]).getRatings, safe=False)
    except KeyError as key:
        return JsonResponse(key.args, safe=False)
