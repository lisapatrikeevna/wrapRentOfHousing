from django.db import models


class RealtyDetail(models.Model):
    internet = models.CharField(max_length=50, blank=True, null=False)
    garage_or_parking = models.CharField(max_length=50, blank=True, null=True)
    balcony = models.CharField(max_length=50, blank=True, null=True)
    heating_type = models.CharField(max_length=50, blank=True, null=True)  # Тип отопления (например, централизованное, автономное)
    air_conditioning = models.BooleanField(default=False)  # Наличие кондиционера
    floor_number = models.PositiveIntegerField(blank=True, null=True)  # Номер этажа
    total_floors = models.PositiveIntegerField(blank=True, null=True)  # Общее количество этажей в здании
    pet_friendly = models.BooleanField(default=False,blank=True, null=True)  # Можно ли держать домашних животных
    furnished = models.BooleanField(default=False,blank=True, null=True)  # С мебелью или без
    description = models.TextField(blank=True, null=True)  # Подробное описание недвижимости
    created_at = models.DateTimeField(auto_now_add=True)  # Дата создания записи
    updated_at = models.DateTimeField(auto_now=True)  # Дата последнего обновления записи






