# Generated by Django 3.2.5 on 2021-08-12 18:50

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('Restaurants', '0012_alter_restaurant_main_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='restaurant',
            name='Likes',
            field=models.ManyToManyField(to=settings.AUTH_USER_MODEL),
        ),
    ]