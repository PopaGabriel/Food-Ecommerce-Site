from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from Food.models import MenuItem

from RatingsItem.models import Ratings


@login_required()
def AddReviewItem(request, **kwargs):
    if request.method == "POST":
        rating, created = Ratings.objects.get_or_create(
            author=request.user, food_id=kwargs["id"])
        rating.mark = kwargs["mark"]
        if kwargs["mark"] == 0:
            if not created:
                rating.delete()
        else:
            rating.save()
        return JsonResponse(MenuItem.objects.get(id=kwargs["id"]).getRatings, safe=False)
