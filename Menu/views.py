import json
from django.contrib.auth.decorators import login_required
from django.core.exceptions import ObjectDoesNotExist
from django.http import JsonResponse

from Section.models import Section
from .models import Menu
from Restaurants.models import Restaurant
from Food.models import MenuItem


@login_required()
def AddMenuView(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            restaurant = Restaurant.objects.get(id=data['restaurant_id'])
            Menu.objects.create(
                type=data['title'], restaurant=restaurant).save()
            return JsonResponse('success', safe=False)

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


def GetMenuView(request, **kwargs):
    if request.method == "GET":
        try:
            menus = Menu.objects.filter(restaurant_id=kwargs["restaurant_id"])
            return JsonResponse(list(menus.values()), safe=False)
        except ValueError as ve:
            return JsonResponse(("error", ve.args), safe=False)


@login_required()
def UpdateMenuView(request, **kwargs):
    data = json.loads(request.body)
    sections_dict = dict(data["sections"])
    for keys, entries in sections_dict.items():
        section = Section.objects.get(id=int(keys))
        section.position = int(entries["pos"])
        section.save(update_fields=["position"])
        items = dict(entries["items"])
        for keys_items, entries_items in items.items():
            item = MenuItem.objects.get(id=int(keys_items))
            item.position = int(entries_items["pos"])
            item.section = section
            item.save(update_fields=['section', 'position'])
    return JsonResponse("Yes", safe=False)
