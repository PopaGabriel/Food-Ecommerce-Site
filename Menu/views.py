from django.contrib.auth.mixins import LoginRequiredMixin
from django.urls import reverse
from django.views.generic import (CreateView,
                                  DeleteView,
                                  UpdateView,)
from .models import (Section,
                     Menu,)
from .forms import (AddSectionForm,
                    AddMenuForm,)


class AddSectionView(LoginRequiredMixin, CreateView):
    model = Section
    form_class = AddSectionForm
    template_name = 'menu/section_add_form.html'

    def form_valid(self, form):
        form.instance.menu_id = self.kwargs['pk']
        return super().form_valid(form)


class DeleteSectionView(LoginRequiredMixin, DeleteView):
    model = Section
    template_name = 'menu/section_delete.html'

    def get_success_url(self):
        return reverse('home')


class UpdateSectionView(LoginRequiredMixin, UpdateView):
    model = Section
    fields = ['name']
    template_name = 'menu/section_update.html'


class AddMenuView(LoginRequiredMixin, CreateView):
    model = Menu
    form_class = AddMenuForm
    template_name = 'menu/meniu_add_form.html'

    def form_valid(self, form):
        form.instance.restaurant_id = self.kwargs['pk']
        return super().form_valid(form)


class DeleteMenuView(LoginRequiredMixin, DeleteView):
    model = Menu
    template_name = 'menu/meniu_delete.html'

    def get_success_url(self):
        return reverse('home')
