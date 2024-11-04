from django.db import models

TYPE_CHOICES = [('apartment', 'apartment'),('villa','villa'), ('studio', 'studio'), ('townhouse', 'townhouse'),('duplex','duplex')]


class Category(models.Model):
    name = models.CharField('typeOfHousing', choices=TYPE_CHOICES, default='apartment', max_length=20)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'category'
        verbose_name_plural = 'categories'
