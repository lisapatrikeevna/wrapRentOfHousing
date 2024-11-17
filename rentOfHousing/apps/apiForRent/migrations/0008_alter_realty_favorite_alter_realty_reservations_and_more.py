# Generated by Django 5.1.1 on 2024-11-17 02:09

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("apiForRent", "0007_realty_reservations_alter_realty_details_and_more"),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AlterField(
            model_name="realty",
            name="favorite",
            field=models.ManyToManyField(
                blank=True,
                null=True,
                related_name="favorite_properties",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
        migrations.AlterField(
            model_name="realty",
            name="reservations",
            field=models.ManyToManyField(
                blank=True,
                null=True,
                related_name="reserv_properties",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
        migrations.AlterField(
            model_name="realty",
            name="views",
            field=models.ManyToManyField(
                blank=True,
                null=True,
                related_name="views_properties",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
    ]
