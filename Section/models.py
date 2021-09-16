from django.db import models
from django.urls import reverse
from Menu.models import Menu


class Section(models.Model):
    name = models.CharField(max_length=100,
                            default='Default Section')
    menu = models.ForeignKey(Menu,
                             on_delete=models.CASCADE,
                             related_name='sections')

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse('Restaurants:detail_restaurant', args=[str(self.menu.restaurant.id)])

