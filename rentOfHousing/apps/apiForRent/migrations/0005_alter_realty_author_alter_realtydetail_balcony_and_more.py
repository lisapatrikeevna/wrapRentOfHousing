# Generated by Django 5.1.1 on 2024-11-11 11:15

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("apiForRent", "0004_realtyfiles"),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AlterField(
            model_name="realty",
            name="author",
            field=models.ForeignKey(
                default=2,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="properties",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
        migrations.AlterField(
            model_name="realtydetail",
            name="balcony",
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name="realtydetail",
            name="floor_number",
            field=models.PositiveIntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name="realtydetail",
            name="furnished",
            field=models.BooleanField(blank=True, default=False, null=True),
        ),
        migrations.AlterField(
            model_name="realtydetail",
            name="garage_or_parking",
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name="realtydetail",
            name="heating_type",
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name="realtydetail",
            name="internet",
            field=models.CharField(blank=True, max_length=50),
        ),
        migrations.AlterField(
            model_name="realtydetail",
            name="pet_friendly",
            field=models.BooleanField(blank=True, default=False, null=True),
        ),
        migrations.AlterField(
            model_name="realtydetail",
            name="total_floors",
            field=models.PositiveIntegerField(blank=True, null=True),
        ),
    ]
