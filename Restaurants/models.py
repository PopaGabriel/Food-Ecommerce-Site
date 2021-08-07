from django.contrib.auth import get_user_model
from django.db import models
from django.urls import reverse

User = get_user_model()


class Tags(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self) -> str:
        return self.name


class Location(models.Model):
    restaurant = models.ForeignKey('Restaurant',
                                   on_delete=models.CASCADE)
    street = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    country = models.CharField(max_length=100)

    def __str__(self) -> str:
        return f"Street: {self.street} City: {self.city} Country: {self.country}"


class Restaurant(models.Model):
    tags = models.ManyToManyField('Tags',
                                  related_name='tags')
    owner = models.ForeignKey(User,
                              on_delete=models.CASCADE,
                              related_name='Businesses')
    email = models.EmailField(max_length=100,
                              default='None@yahoo.com')
    personal_site = models.URLField(max_length=100,
                                    default='www.google.com',
                                    blank=True,
                                    null=True)
    minimum_value_command = models.FloatField(default=0)

    phoneNumber = models.CharField(max_length=20,
                                   default='Missing')
    is_open = models.BooleanField(default=True)
    name = models.CharField(max_length=100,
                            blank=False,
                            null=False)
    description = models.CharField(max_length=100,
                                   blank=False,
                                   null=False,
                                   default='')
    delivery = models.BooleanField(default=False)

    main_image = models.ImageField(null=True,
                                   blank=True,
                                   upload_to='images/')

    def __str__(self) -> str:
        return self.name

    def get_absolute_url(self):
        return reverse('Restaurants:detail_restaurant', args=[str(self.id)])
