from django.db import models


class Ingredient(models.Model):
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=1000,
                                   null=True,
                                   blank=True)

    def __str__(self):
        return self.name
# Create your models here.
