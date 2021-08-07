from django.contrib.auth import get_user_model, authenticate, login
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.views import LoginView
from django.urls import reverse
from django.views.generic import (CreateView,
                                  UpdateView,
                                  DetailView)
from .forms import (UserRegisterForm,
                    UserUpdateForm,
                    UserLoginForm)


User = get_user_model()


class CreateUser(CreateView):
    model = User
    form_class = UserRegisterForm
    template_name = 'registration/SignUp.html'

    def get_success_url(self):
        return reverse('home')


class UpdateUser(LoginRequiredMixin, UpdateView):
    model = User
    form_class = UserUpdateForm
    template_name = 'registration/update_profile.html'

    def get_success_url(self):
        return reverse('home')

    def get_object(self, queryset=None):
        return self.request.user
