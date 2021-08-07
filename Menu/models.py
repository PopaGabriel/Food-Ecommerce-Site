from django.db import models
from django.urls import reverse
from django.utils.translation import gettext_lazy as _


class Menu(models.Model):
    class Types(models.TextChoices):
        a_la_carte_menu = 'A La Carte Menu', _('a la carte menu')
        static_menu = 'Static Menu', _('static menu')
        du_jour_menu = 'Du Jour Menu', _('du jour menu')
        cycle_menu = 'Cycle Menu', _('cycle menu')
        fixed_menu = 'Fixed Menu', _('fixed_menu')

    type = models.CharField(max_length=100,
                            choices=Types.choices,
                            default=Types.fixed_menu)
    restaurant = models.ForeignKey('Restaurants.Restaurant',
                                   on_delete=models.CASCADE,
                                   related_name='menus')

    def __str__(self) -> str:
        return f'Type: {self.type} Restaurant: {self.restaurant}'

    def get_absolute_url(self):
        return reverse('Restaurants:detail_restaurant', args=[str(self.restaurant.id)])


class Section(models.Model):
    name = models.CharField(max_length=100,
                            default='Default Section')
    menu = models.ForeignKey('Menu',
                             on_delete=models.CASCADE,
                             related_name='sections')

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse('Restaurants:detail_restaurant', args=[str(self.menu.restaurant.id)])
