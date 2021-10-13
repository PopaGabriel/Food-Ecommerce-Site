import json

from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.core.exceptions import ObjectDoesNotExist
from django.http import JsonResponse
from django.views.generic import (UpdateView)

from Proiect_atelier_google.settings import MEDIA_URL
from .models import MenuItem
from .forms import AddMenuItemForm

# TODO still have to add the ingredients part


@login_required()
def AddMenuItemView(request):
    if request.method == "POST":
        try:
            form = AddMenuItemForm(request.POST, request.FILES)

            if form.is_valid():
                item = form.save(commit=False)
                form.save()
                dictionary = item.__dict__
                del dictionary["_state"]
                dictionary["image"] = dictionary["image"].name
            else:
                JsonResponse(form.errors, safe=False)
            return JsonResponse(dictionary, safe=False)
        except ObjectDoesNotExist as obj:
            return JsonResponse(obj.args, safe=False)
        except KeyError as key:
            return JsonResponse(key.args, safe=False)
        except ValueError as value:
            return JsonResponse(value.args, safe=False)
        except Exception as exception:
            return JsonResponse(exception.args, safe=False)


@ login_required()
def DeleteMenuItemView(request):
    if request.method == "POST":
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
