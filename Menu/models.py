from django.db import models
from django.urls import reverse


class Menu(models.Model):
    type = models.CharField(max_length=100)
    restaurant = models.ForeignKey('Restaurants.Restaurant',
                                   on_delete=models.CASCADE,
                                   related_name='menus')

    def __str__(self) -> str:
        return f'Type: {self.type} Restaurant: {self.restaurant}'

    def get_absolute_url(self):
        return reverse('Restaurants:detail_restaurant', args=[str(self.restaurant.id)])
