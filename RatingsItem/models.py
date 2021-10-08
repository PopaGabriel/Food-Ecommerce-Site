from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.contrib.auth import get_user_model

User = get_user_model()


class Ratings(models.Model):
    author = models.ForeignKey(User,
                               on_delete=models.CASCADE,
                               related_name="personal_rating")
    food = models.ForeignKey('Food.MenuItem',
                             on_delete=models.CASCADE,
                             related_name="ratings")
    mark = models.IntegerField(validators=[MinValueValidator(0),
                                           MaxValueValidator(5)],
                               default=3)

    def __str__(self) -> str:
        return "" + str(self.food) + str(self.mark)
