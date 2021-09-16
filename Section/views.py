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
    try:
        data = json.loads(request.body)
        Section.objects.create(name=data['title'], menu=Menu.objects.get(id=data['menu'])).save()
        return JsonResponse('Success', safe=False)
    except ObjectDoesNotExist:
        return JsonResponse('Failure', safe=False)

# class DeleteSectionView(LoginRequiredMixin, DeleteView):
#     model = Section
#     template_name = 'menu/section_delete.html'
#
#     def get_success_url(self):
#         return reverse('home')
#
#
# class UpdateSectionView(LoginRequiredMixin, UpdateView):
#     model = Section
#     fields = ['name']
#     template_name = 'menu/section_update.html'
