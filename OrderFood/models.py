from django.db import models
from Food.models import MenuItem


class OrderFood(models.Model):
    food_basket = models.ForeignKey('Food_basket.Basket',
                                    on_delete=models.CASCADE)
    food = models.ForeignKey(MenuItem,
                             on_delete=models.SET_NULL,
                             null=True)
    quantity = models.IntegerField(default=0)

    @property
    def get_total_price(self):
        return self.food.sell_price * self.quantity
