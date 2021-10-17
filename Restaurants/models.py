from django.contrib.auth import get_user_model
from django.db import models
from django.db.models import fields
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
    best_discount = models.IntegerField(default=0)
    main_image = models.ImageField(null=True,
                                   blank=True,
                                   upload_to='images/')

    def __str__(self) -> str:
        return self.name

    def get_discount_max(self) -> int:
        """[summary]
        Method used only to manully update the discount of the menus.
        Returns:
            int: [description] -> The biggest discount
        """
        discount = 0
        for menu in self.menus.all():
            for section in menu.sections.all():
                for item in section.items.all():
                    if item.discount > discount:
                        discount = item.discount
        self.best_discount = discount
        self.save(update_fields=["best_discount"])
        return discount

    @staticmethod
    def update_discount_all_menus():
        """[summary]
        Static method to update the discount of all the restaurants
        """
        for restaurant in Restaurant.objects.all():
            restaurant.get_discount_max()

    @property
    def getRatings(self) -> float:
        """
        Returns the medium value of the ratings

        Returns:
            float: Medium value of the ratings
        """
        sum = 0
        for rating in self.ratings_restaurant.all():
            sum += rating.mark
        if len(self.ratings_restaurant.all()) == 0:
            return 0
        return sum/len(self.ratings_restaurant.all())

    def getRatingUser(self, user) -> int:
        """
        Returns the mark the user gave the food

        Args:
            user (User): The user that we search for

        Returns:
            int: Mark the user gave
        """
        query = self.ratings_restaurant.all().filter(author=user)
        mark = query[0].mark if query.exists() else 0
        return mark

    def get_absolute_url(self):
        return reverse('Restaurants:detail_restaurant', args=[str(self.id)])
