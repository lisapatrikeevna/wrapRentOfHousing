from django.db import models


class RealtyDetail(models.Model):
    internet = models.CharField(max_length=50, blank=True, null=False)
    garage_or_parking = models.CharField(max_length=50, blank=True, null=True)
    balcony = models.CharField(max_length=50, blank=True, null=True)
    heating_type = models.CharField(max_length=50, blank=True, null=True)  # Тип отопления (например, централизованное, автономное)
    air_conditioning = models.BooleanField(default=False)  # Наличие кондиционера
    floor_number = models.PositiveIntegerField(blank=False, null=False)  # Номер этажа
    total_floors = models.PositiveIntegerField(blank=False, null=False)  # Общее количество этажей в здании
    pet_friendly = models.BooleanField(default=False)  # Можно ли держать домашних животных
    furnished = models.BooleanField(default=False)  # С мебелью или без
    description = models.TextField(blank=True, null=True)  # Подробное описание недвижимости
    created_at = models.DateTimeField(auto_now_add=True)  # Дата создания записи
    updated_at = models.DateTimeField(auto_now=True)  # Дата последнего обновления записи






