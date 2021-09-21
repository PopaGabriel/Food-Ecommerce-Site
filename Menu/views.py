import json
from django.contrib.auth.decorators import login_required
from django.core.exceptions import ObjectDoesNotExist
from django.http import JsonResponse
from .models import Menu
from Restaurants.models import Restaurant


@login_required()
def AddMenuView(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            restaurant = Restaurant.objects.get(id=data['restaurant_id'])
            Menu.objects.create(type=data['title'], restaurant=restaurant).save()
            return JsonResponse('Success', safe=False)

        except ValueError:
            return JsonResponse('error', safe=False)
        except ObjectDoesNotExist:
            return JsonResponse('error', safe=False)


@login_required()
def DeleteMenuView(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            Menu.objects.get(id=data['menu']).delete()
            return JsonResponse('success', safe=False)
        except ValueError:
            return JsonResponse('error', safe=False)
        except ObjectDoesNotExist:
            return JsonResponse('error', safe=False)
