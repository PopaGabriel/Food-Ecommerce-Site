from django.contrib.auth import get_user_model
from django.db import models
from django.urls import reverse_lazy

User = get_user_model()


class Profile(models.Model):
    user = models.OneToOneField(User,
                                on_delete=models.CASCADE,
                                related_name='profile')
    bio = models.TextField(max_length=255,
                           default='No bio present')
    main_image = models.ImageField(null=True,
                                   blank=True,
                                   upload_to='profile/images/')

    def __str__(self):
        return str(self.user)

    def get_absolute_url(self):
        return reverse_lazy('home')
# Create your models here.
