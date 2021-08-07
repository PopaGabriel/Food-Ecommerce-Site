# Generated by Django 3.2.5 on 2021-08-05 10:19

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('Restaurants', '0006_alter_restaurant_location'),
    ]

    operations = [
        migrations.AddField(
            model_name='restaurant',
            name='owner',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='Businesses', to='CustomUsers.basecustomuser'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='restaurant',
            name='email',
            field=models.URLField(default='None@yahoo.com', max_length=100),
        ),
        migrations.AlterField(
            model_name='restaurant',
            name='personal_site',
            field=models.URLField(blank=True, default='www.google.com', max_length=100, null=True),
        ),
    ]
