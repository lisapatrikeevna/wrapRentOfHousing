from datetime import date, timedelta

from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models
from rest_framework.exceptions import ValidationError

from apps.apiForRent.management.managers import SoftDeleteRentManager
from apps.apiForRent.models import RealtyDetail
# from apps.apiForRent.models.booking import Booking
from apps.user.models.customUser import CustomUser




class RealtyLevel(models.TextChoices):
    STANDARD = 'standard', 'Стандарт'
    ECONOMY = 'economy', 'Эконом'
    COMFORT = 'comfort', 'Комфорт'
    PREMIUM = 'premium', 'Премиум'
    LUXURY = 'luxury', 'Люкс'
    SUPER_LUXURY = 'super_luxury', 'Супер-люкс'


class Realty(models.Model):
    title = models.CharField(max_length=150, null=False, blank=False, unique=True)
    description = models.TextField('property description', null=False, blank=False)
    location = models.CharField('location', max_length=200)
    price = models.FloatField('price', validators=[MinValueValidator(1)])
    number_of_rooms = models.PositiveSmallIntegerField('number of rooms', validators=[MinValueValidator(1)])
    category = models.ForeignKey('Category', on_delete=models.DO_NOTHING)
    available = models.BooleanField(default=True)
    rating = models.FloatField('rating (1-5)', null=True, validators=[MinValueValidator(1), MaxValueValidator(5)], help_text='min: 1, max: 5')
    register_date = models.DateField(auto_now_add=True)
    available_date = models.DateField('availability date')
    booking_details = models.ManyToManyField(CustomUser, through='Booking',blank=True, related_name='booking_properties')
    real_estate_image = models.ImageField('main real estate picture', upload_to='real_estate_images/', null=True, blank=True)
    author = models.ForeignKey(CustomUser, on_delete=models.CASCADE, default=2, related_name='properties')
    class_realty = models.CharField(max_length=50, choices=RealtyLevel.choices, null=False, blank=False, default='standard')
    details = models.OneToOneField(RealtyDetail, on_delete=models.CASCADE, null=True, blank=True, related_name='details')
    square_footage = models.FloatField(blank=False, null=False, default=0)  # Площадь в квадратных метрах
    is_deleted = models.BooleanField(default=False)  # for soft deleted  # Для мягкого удаления
    favorite = models.ManyToManyField(CustomUser, blank=True, related_name='favorite_properties')
    views = models.ManyToManyField(CustomUser, blank=True, related_name='views_properties')
    reservations = models.ManyToManyField(CustomUser, blank=True, related_name='reserv_properties')
    objects = SoftDeleteRentManager()  # Для мягкого удаления

    def delete(self, *args, **kwargs):
        self.is_deleted = True
        self.save()

    def update_availability(self):
        # Если есть активные бронирования, делаем квартиру недоступной
        latest_booking = self.booking_details.filter(end_date__gte=date.today()).order_by('start_date').first()
        if latest_booking:
            self.available = False
            self.available_date = latest_booking.end_date + timedelta(days=1)
        else:
            self.available = True
            self.available_date = None
        self.save()


    def __str__(self):
        return self.title

    class Meta:
        ordering = ['-register_date', 'title']
        indexes = [
            models.Index(fields=['register_date', 'title']),
            models.Index(fields=['category']),  # Индекс на категорию
        ]


