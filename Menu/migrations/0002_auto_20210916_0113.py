# Generated by Django 3.2.5 on 2021-09-15 22:13

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('Restaurants', '0001_initial'),
        ('Menu', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='section',
            name='menu',
        ),
        migrations.AlterField(
            model_name='menu',
            name='restaurant',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sections', to='Restaurants.restaurant'),
        ),
        migrations.AlterField(
            model_name='menu',
            name='type',
            field=models.CharField(max_length=100),
        ),
    ]
