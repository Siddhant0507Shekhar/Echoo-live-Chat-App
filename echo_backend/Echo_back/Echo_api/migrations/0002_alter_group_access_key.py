# Generated by Django 4.2.2 on 2023-06-12 12:40

import Echo_api.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Echo_api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='group',
            name='access_key',
            field=models.CharField(default=Echo_api.models.generate_access_key, max_length=7, unique=True),
        ),
    ]
