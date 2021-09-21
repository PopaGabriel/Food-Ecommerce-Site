from django.contrib.auth.mixins import LoginRequiredMixin
from django.urls import reverse
import json
from Restaurants.models import Restaurant
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
            Section.objects.create(name=data['title'], menu=Menu.objects.get(id=data['menu'])).save()
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
