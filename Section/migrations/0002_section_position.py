# Generated by Django 3.2.5 on 2021-10-10 16:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Section', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='section',
            name='position',
            field=models.IntegerField(default=0),
        ),
    ]
