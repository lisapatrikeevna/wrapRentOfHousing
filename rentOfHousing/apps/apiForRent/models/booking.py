from django.db import models







class Booking(models.Model):
  realty = models.ForeignKey('apiForRent.Realty', on_delete=models.CASCADE)
  user = models.ForeignKey('user.CustomUser', on_delete=models.CASCADE, related_name='booking_user')
  start_date = models.DateField()
  end_date = models.DateField()

  def __str__(self):
    return f'Reservation ({self.start_date} - {self.end_date}) for {self.realty.title}'
