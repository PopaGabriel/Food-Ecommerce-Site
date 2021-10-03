import json

from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.core.exceptions import ObjectDoesNotExist
from django.http import JsonResponse
from django.views.generic import (UpdateView)

from Proiect_atelier_google.settings import STATIC_URL, MEDIA_URL
from .models import MenuItem
from Section.models import Section


@login_required()
def AddMenuItemView(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            if len(data['name']) < 2:
                raise Exception("Name exception")
            menu_item = MenuItem.objects.create(price=int(data["price"]),
                                                discount=int(data["discount"]),
                                                name=data["name"],
                                                section=Section.objects.get(
                                                    id=data["section_id"]),
                                                is_for_adults=0 if not data["adult"] else 1)
            if data["image"] != "" and any(data["image"].endswith(elem) for elem in [".jpg", ".png"]):
                menu_item.photo = data["image"]

            menu_item.save()
            print(menu_item)

            return JsonResponse("success", safe=False)
        except ObjectDoesNotExist as obj:
            return JsonResponse(obj.args, safe=False)
        except KeyError as key:
            return JsonResponse(key.args, safe=False)
        except ValueError as value:
            return JsonResponse(value.args, safe=False)
        except Exception as exception:
            return JsonResponse(exception.args, safe=False)


@login_required()
def DeleteMenuItemView(request):
    if request.method == "POST":
        data = json.loads(request.boy)
        print(data)
        return JsonResponse("success", safe=False)


def GetBasicImagePhoto(request):
    if request.method == "GET":
        return JsonResponse(MEDIA_URL + "images/Salam.jpg", safe=False)


def GetItems(request, restaurant_id):
    if request == "GET":
        print(MenuItem.objects.get(restaurant_id=restaurant_id))
        return JsonResponse("yes")


class UpdateMenuItemView(LoginRequiredMixin, UpdateView):
    model = MenuItem
    template_name = 'Food/update_menu_item.html'
    # form_class = UpdateMenuItemForm
