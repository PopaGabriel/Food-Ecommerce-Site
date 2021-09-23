import json
from .models import Ingredient
from django.contrib.auth.decorators import login_required
from django.core.exceptions import ObjectDoesNotExist
from django.http import JsonResponse
from django.shortcuts import render


@login_required()
def GetIngredients(request, **kwargs):
    if request.method == 'GET':
        return JsonResponse(
            [(elem.id, elem.name) for elem in Ingredient.objects.filter(name__startswith=kwargs['name'])], safe=False)
