from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager


class UserManager(BaseUserManager):

    def create_user(self, email, password, username, cnp='', active=True, staff=False, admin=False):

        if not email:
            raise ValueError('No email given :(')

        if not password:
            raise ValueError('There should be a password')

        if not cnp:
            raise ValueError('No cnp was given')

        user = self.model(email=self.normalize_email(email),
                          username=username,
                          cnp=cnp,
                          staff=staff,
                          is_active=active,
                          admin=admin)
        user.set_password(password)
        print(user.password)
        user.save()
        print(password)
        return user

    def create_staff(self, email, password, username, cnp):
        return self.create_user(email=email, staff=True, password=password, username=username, cnp=cnp)

    def create_superuser(self, email, password, username, cnp):
        return self.create_user(email=email, staff=True, admin=True, password=password, username=username, cnp=cnp)


class BaseCustomUser(AbstractBaseUser):
    email = models.EmailField(max_length=255, unique=True)
    username = models.CharField(max_length=255)
    cnp = models.CharField(max_length=15)
    is_active = models.BooleanField(default=True)
    staff = models.BooleanField(default=False)
    admin = models.BooleanField(default=False)
    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'cnp']

    def __str__(self):
        return self.get_username()

    def has_perm(self, perm, obj=None):
        return True

    def has_perms(self):
        return True

    def has_module_perms(self, app_label):
        return True

    @property
    def is_staff(self):
        return self.staff

    @property
    def is_admin(self):
        return self.admin

    @property
    def is_superuser(self):
        return self.admin
