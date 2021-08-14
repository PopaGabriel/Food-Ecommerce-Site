from django.contrib.auth import get_user_model
from django.db import models
from OrderFood.models import OrderFood
from Restaurants.models import Restaurant

User = get_user_model()


class Basket(models.Model):
    restaurant = models.ForeignKey(Restaurant,
                                   null=True,
                                   on_delete=models.SET_NULL)
    user = models.ForeignKey(User,
                             null=True,
                             on_delete=models.SET_NULL)
    sent = models.BooleanField(default=False)

    @property
    def get_total_price(self) -> float:
        """
        Returns the total price of the items in the basket
        """
        return sum(food.get_total_price for food in self.orderfood_set.all())
