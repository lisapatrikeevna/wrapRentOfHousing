from django.db import models
from rest_framework.exceptions import ValidationError

# from apps import apiForRent
# from apps.apiForRent.models import Realty
# from apps.user.models import CustomUser






class Booking(models.Model):
  realty = models.ForeignKey('apiForRent.Realty', on_delete=models.CASCADE)
  user = models.ForeignKey('user.CustomUser', on_delete=models.CASCADE, related_name='booking_user')
  start_date = models.DateField()
  end_date = models.DateField()


  def clean(self):
    # Проверка на пересечение дат
    overlapping_reservations = Booking.objects.filter(realty=self.realty, end_date__gte=self.start_date, start_date__lte=self.end_date ).exclude(pk=self.pk)

    if overlapping_reservations.exists():
      raise ValidationError('The selected dates overlap with an existing reservation.')

  def save(self, *args, **kwargs):
    if self.start_date >= self.end_date:
      raise ValidationError('Start date must be before end date.')
    self.clean()
    super().save(*args, **kwargs)

  def __str__(self):
    return f'Reservation ({self.start_date} - {self.end_date}) for {self.realty.title}'
