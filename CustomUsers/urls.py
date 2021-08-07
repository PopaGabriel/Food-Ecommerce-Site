from django.urls import path, include
from CustomUsers.views import (CreateUser,
                               UpdateUser)
from django.contrib.auth import views as auth_views
from .forms import (UserLoginForm)

app_name = 'Users'

urlpatterns = [
    path('', CreateUser.as_view(), name='signup'),
    path('update_profile/', UpdateUser.as_view(), name='update_profile'),
    path('login_user', auth_views.LoginView.as_view(template_name='registration/login.html', form_class=UserLoginForm),
         name='login_user'),
    path('logout', auth_views.LogoutView.as_view(next_page='home'), name='logout')
]
