# Generated by Django 3.2.5 on 2021-08-05 13:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Profile', '0002_profile_bio'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='main_image',
            field=models.ImageField(blank=True, null=True, upload_to='images/'),
        ),
    ]
