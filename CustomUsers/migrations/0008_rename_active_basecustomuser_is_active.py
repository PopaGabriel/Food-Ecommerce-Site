# Generated by Django 3.2.5 on 2021-08-01 23:41

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('CustomUsers', '0007_alter_basecustomuser_email'),
    ]

    operations = [
        migrations.RenameField(
            model_name='basecustomuser',
            old_name='active',
            new_name='is_active',
        ),
    ]