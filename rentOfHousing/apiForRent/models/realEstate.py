from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models

from django import forms
# from .models import Realty


class Realty(models.Model):
    title = models.CharField(max_length=150, null=False, blank=False)
    description = models.TextField()
    location = models.CharField('locations', max_length=200)
    price = models.DecimalField(decimal_places=2, max_digits=10,validators=[MinValueValidator(0)])
    number_of_rooms = models.PositiveSmallIntegerField('count rooms', validators=[MinValueValidator(1)])
    category = models.ForeignKey('Category', on_delete=models.DO_NOTHING)
    available = models.BooleanField(default=True)
    rating = models.FloatField('rating (1-10)', null=True, validators=[MinValueValidator(1), MaxValueValidator(10)], help_text='min:1,max:10')
    register_date = models.DateField(auto_now_add=True)
    available_date = models.DateField('available date')
    real_estate_image = models.ImageField(upload_to='real_estate_images/', null=True, blank=True)
    author = models.ForeignKey('Autor', on_delete=models.CASCADE, related_name='properties',null=True, blank=True)

    def __str__(self):
        return self.title


class RealtyForm(forms.ModelForm):
    class Meta:
        model = Realty
        fields = ['title', 'description', 'location', 'price', 'number_of_rooms', 'category', 'available', 'rating', 'available_date', 'real_estate_image']


























