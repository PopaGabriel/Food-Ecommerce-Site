# Generated by Django 3.2.5 on 2021-08-05 13:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Profile', '0003_profile_main_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='main_image',
            field=models.ImageField(blank=True, null=True, upload_to='profile/images/'),
        ),
    ]
