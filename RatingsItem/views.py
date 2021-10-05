from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.core.exceptions import ObjectDoesNotExist
from django.http import JsonResponse
import json


@login_required()
def AddReviewItem(request, **kwargs):
    if request.method == "POST":
        print(kwargs["mark"], kwargs["id"])
        return JsonResponse("yes", safe=False)


@login_required()
def RemoveReviewItem(request, **kwargs):
    if request.method == "POST":
        print(kwargs["id"])
        return JsonResponse("yes", safe=False)
