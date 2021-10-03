from django.contrib.auth.mixins import LoginRequiredMixin
from django.db.models.expressions import Exists
from django.urls import reverse
import json
from Food.models import MenuItem
from RatingsItem.models import Ratings
from django.contrib.auth.decorators import login_required
from django.core.exceptions import ObjectDoesNotExist
from django.http import JsonResponse
from .models import Section
from Menu.models import Menu
from django.forms.models import model_to_dict


@login_required()
def SectionAddView(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            Section.objects.create(
                name=data['title'], menu=Menu.objects.get(id=data['menu'])).save()
            return JsonResponse('Success', safe=False)
        except ObjectDoesNotExist:
            return JsonResponse('Failure', safe=False)


@login_required()
def SectionDeleteView(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            Section.objects.get(id=data['id']).delete()
            return JsonResponse('Success', safe=False)

        except ObjectDoesNotExist:
            return JsonResponse('Error', safe=False)


@login_required()
def SectionUpdateView(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            section = Section.objects.get(id=data['id'])
            section.name = data['name']
            section.save()

            return JsonResponse('Success', safe=False)

        except ObjectDoesNotExist:
            return JsonResponse('Error', safe=False)


def SectionGet(request, **kwargs):
    if request.method == "GET":
        try:
            return JsonResponse(Section.objects.get(id=kwargs["pk"]), safe=False)
        except ObjectDoesNotExist:
            return JsonResponse("error", safe=False)


def SectionGetAll(request, **kwargs):
    def getRatings(section):
        for item in section:
            if request.user.is_authenticated:
                rating = Ratings.objects.filter(
                    food_id=int(item["id"]), author=request.user)
                item["rating_user"] = None if not rating.exists(
                ) else rating.first.mark
            else:
                item["rating_user"] = None
            item["rating"] = MenuItem.objects.get(id=item["id"]).getRatings

    if request.method == "GET":
        try:
            sections = Section.objects.filter(
                menu_id=kwargs["menu"]).values()
            for section in sections:
                section["items"] = list(MenuItem.objects.filter(
                    section_id=section["id"]).values())
                getRatings(section["items"])
            return JsonResponse(list(sections), safe=False)
        except ObjectDoesNotExist:
            return JsonResponse("error", safe=False)
