# Generated by Django 3.2.5 on 2021-07-31 14:39

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('Restaurants', '0003_auto_20210731_1739'),
        ('Menu', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='menu',
            name='restaurant',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Restaurants.restaurant'),
        ),
    ]