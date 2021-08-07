from django.contrib.auth import get_user_model
from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import (render,
                              get_object_or_404)
from django.views.generic import (DetailView,
                                  CreateView,
                                  UpdateView,)
from .models import Profile
from .forms import ProfileForm

User = get_user_model()


class ViewProfileUser(LoginRequiredMixin, DetailView):
    model = Profile
    template_name = 'profile/profile_detail.html'

    # def get_context_data(self, **kwargs):
    #     users = User.objects.all()
    #     context = super(ViewProfileUser, self).get_context_data(**kwargs)
    #     target_user = get_object_or_404(User, self.kwargs['pk'])
    #     context['target_user'] = target_user
    #     return context


class CreateProfileUser(LoginRequiredMixin, CreateView):
    model = Profile
    template_name = 'profile/profile_create.html'
    form_class = ProfileForm

    def form_valid(self, form):
        form.instance.user = self.request.user
        return super().form_valid(form)


class UpdateProfileView(LoginRequiredMixin, UpdateView):
    model = Profile
    template_name = 'profile/profile_update.html'
    form_class = ProfileForm
