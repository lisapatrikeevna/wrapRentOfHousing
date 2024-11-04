from django.db import models

from apps.apiForRent.models import Realty


class RealtyFiles(models.Model):
    file_name = models.CharField(max_length=100, null=True,blank=True)
    path = models.FileField(upload_to='realtyFiles/')
    realty = models.ForeignKey(Realty, on_delete=models.CASCADE, related_name='realtyFiles')

    def __str__(self):
        return self.file_name or self.path.name  # Возвращает имя файла или имя, если file_name не задано

    class Meta:
        verbose_name = 'Файл недвижимости'
        verbose_name_plural = 'Файлы недвижимости'
        ordering = ['realty']  # Сортировка по объекту недвижимости
#
# class RealtyImg(models.Model):
#     file_name = models.CharField(max_length=100, null=True,blank=True,unique=True)
#     path = models.ImageField(upload_to='real_estate_images/', null=True,blank=True,unique=True)
#     realty = models.ForeignKey(Realty, on_delete=models.CASCADE , realated_name='realtyImg')










