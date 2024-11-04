# Generated by Django 5.1.1 on 2024-10-17 12:34

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='rating',
            field=models.FloatField(help_text='min: 1, max: 5', null=True, validators=[django.core.validators.MinValueValidator(1), django.core.validators.MaxValueValidator(5)], verbose_name='rating (1-5)'),
        ),
    ]
