# Generated by Django 3.2.5 on 2021-08-14 15:19

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('Food_basket', '0001_initial'),
        ('Food', '0005_alter_menuitem_photo'),
    ]

    operations = [
        migrations.CreateModel(
            name='OrderFood',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.IntegerField(default=0)),
                ('food', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='Food.menuitem')),
                ('food_basket', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Food_basket.basket')),
            ],
        ),
    ]