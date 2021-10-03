from django.db import models
from django.urls import reverse
from django.utils.translation import gettext_lazy as _


class MenuItem(models.Model):
    class AdultOriented(models.IntegerChoices):
        Yes = 1, _('Yes')
        No = 0, _('No')

    section = models.ForeignKey('Section.Section',
                                on_delete=models.CASCADE,
                                related_name='items')
    ingredients = models.ManyToManyField(
        'Ingredients.Ingredient', related_name='ingredients')

    is_for_adults = models.IntegerField(choices=AdultOriented.choices,
                                        default=AdultOriented.No)
    is_available = models.BooleanField(default=True)
    description = models.CharField(max_length=250,
                                   default="Descriptions are hard")
    name = models.CharField(max_length=100)
    price = models.FloatField(blank=False)
    discount = models.FloatField(default=0)
    image = models.ImageField(upload_to='images/',
                              default='images/Salam.jpg')

    @property
    def getRatings(self) -> float:
        sum = 0
        for rating in self.ratings.all():
            sum += rating.mark
        if len(self.ratings.all()) == 0:
            return 0
        return sum/len(self.ratings.all())

    @property
    def sell_price(self) -> float:
        """Returns the selling price of a product"""
        return (1 - self.discount / 100) * self.price

    def __str__(self):
        return f'{self.name} Price: {self.sell_price}'

    def get_absolute_url(self):
        return reverse('Restaurants:detail_restaurant', args=[str(self.section.menu.restaurant.id)])
