import json
from Food.models import MenuItem
from RatingsItem.models import Ratings
from django.contrib.auth.decorators import login_required
from django.core.exceptions import ObjectDoesNotExist
from django.http import JsonResponse
from .models import Section
from Menu.models import Menu


@login_required()
def SectionAddView(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            section = Section.objects.create(
                name=data['title'], menu=Menu.objects.get(id=data['menu']))
            section.save()
            return JsonResponse(section.id, safe=False)
        except ObjectDoesNotExist:
            return JsonResponse('error', safe=False)


@login_required()
def SectionDeleteView(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            Section.objects.get(id=data['id']).delete()
            return JsonResponse('success', safe=False)

        except ObjectDoesNotExist:
            return JsonResponse('error', safe=False)


@login_required()
def SectionUpdateView(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            section = Section.objects.get(id=data['id'])
            section.name = data['name']
            section.save()

            return JsonResponse('success', safe=False)

        except ObjectDoesNotExist:
            return JsonResponse('error', safe=False)


def SectionGet(request, **kwargs):
    pass
    # if request.method == "GET":
    #     try:
    #         return JsonResponse(Section.objects.get(id=kwargs["pk"]), safe=False)
    #     except ObjectDoesNotExist:
    #         return JsonResponse("error", safe=False)


def SectionGetAll(request, **kwargs):

    if request.method == "GET":
        try:
            sections = Section.objects.filter(
                menu_id=kwargs["menu"]).values()
            for section in sections:
                query_items = MenuItem.objects.filter(
                    section_id=section["id"])
                section["items"] = list(query_items.values())
                for i, item in enumerate(query_items):
                    section["items"][i]["ingredients"] = list(
                        item.ingredients.all())
                    section["items"][i]["rating_user"] = item.getRatingUser(
                        request.user)
                    section["items"][i]["rating"] = item.getRatings
            return JsonResponse(list(sections), safe=False)
        except ObjectDoesNotExist:
            return JsonResponse("error", safe=False)
