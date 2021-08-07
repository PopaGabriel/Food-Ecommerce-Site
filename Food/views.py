from django.contrib.auth.mixins import LoginRequiredMixin
from django.urls import reverse, reverse_lazy
from django.views.generic import (CreateView,
                                  DeleteView,
                                  UpdateView,)
from .forms import (AddMenuItemForm,
                    UpdateMenuItemForm)
from .models import MenuItem


class AddMenuItemView(LoginRequiredMixin, CreateView):
    form_class = AddMenuItemForm
    template_name = 'Food/add_menu_item.html'
    model = MenuItem

    def form_valid(self, form):
        form.instance.section_id = self.kwargs['pk']
        return super().form_valid(form)


class DeleteMenuItemView(LoginRequiredMixin, DeleteView):
    model = MenuItem
    template_name = 'Food/delete_menu_item.html'

    def get_success_url(self):
        return reverse_lazy('home')


class UpdateMenuItemView(LoginRequiredMixin, UpdateView):
    model = MenuItem
    template_name = 'Food/update_menu_item.html'
    form_class = UpdateMenuItemForm
