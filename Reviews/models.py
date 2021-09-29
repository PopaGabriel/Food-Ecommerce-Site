from django.db import models
from django.urls import reverse_lazy
from django.utils.translation import gettext_lazy as _
from django.contrib.auth import get_user_model
from Restaurants.models import Restaurant
from Comments.models import Comments

User = get_user_model()


class Review(models.Model):
    class Mark(models.IntegerChoices):
        Very_Good = 5, _('Great 5/5')
        Good = 4, _('Good 4/5')
        Mediocre = 3, _('Mediocre 3/5')
        Bad = 2, _('Bad 2/5')
        Very_Bad = 1, _('No Type 1/5')

    mark = models.IntegerField(default=Mark.Mediocre,
                               choices=Mark.choices,
                               blank=False)
    title = models.CharField(max_length=100,
                             null=True,
                             blank=True)
    body = models.CharField(max_length=400)
    is_anonymous = models.BooleanField(default=False)
    restaurant = models.ForeignKey(Restaurant,
                                   on_delete=models.SET_NULL,
                                   null=True,
                                   related_name='reviews')
    author = models.ForeignKey(User,
                               on_delete=models.SET_NULL,
                               related_name='reviews',
                               null=True)
    published_date = models.DateField(auto_now_add=True)
    likes = models.ManyToManyField(User,
                                   related_name='likes_reviews')
    dislikes = models.ManyToManyField(User,
                                      related_name='dislikes_reviews')

    def get_absolute_url(self):
        return reverse_lazy('Restaurants:detail_restaurant', args=[str(self.restaurant.id)])

    def __str__(self):        
        return f"Title:{self.title}" \
               f" Author:{self.body} " \
               f"is_anonymous:{self.is_anonymous} " \
               f"Restaurant:{self.restaurant} " \
               f"body:{self.body}"
# Create your models here.
