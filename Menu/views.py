from django.contrib.auth.mixins import LoginRequiredMixin
from django.urls import reverse
from django.views.generic import (CreateView,
                                  DeleteView,
                                  UpdateView,)
from .models import Menu


class AddMenuView(LoginRequiredMixin, CreateView):
    model = Menu
    # form_class = AddMenuForm
    template_name = 'menu/meniu_add_form.html'

    def form_valid(self, form):
        form.instance.restaurant_id = self.kwargs['pk']
        return super().form_valid(form)


class DeleteMenuView(LoginRequiredMixin, DeleteView):
    model = Menu
    template_name = 'menu/meniu_delete.html'

    def get_success_url(self):
        return reverse('home')
