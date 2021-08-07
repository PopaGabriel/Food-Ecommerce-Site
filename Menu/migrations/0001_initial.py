# Generated by Django 3.2.5 on 2021-07-29 11:23

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('Restaurants', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Menu',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.CharField(choices=[('ALCM', 'a la carte menu'), ('SM', 'static menu'), ('DJM', 'du jour menu'), ('CM', 'cycle menu'), ('FM', 'fixed_menu')], default='FM', max_length=100)),
                ('restaurant', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Restaurants.company')),
            ],
        ),
        migrations.CreateModel(
            name='Section',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(default='Default Section', max_length=100)),
                ('menu', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sections', to='Menu.menu')),
            ],
        ),
    ]
