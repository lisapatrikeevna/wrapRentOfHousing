
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver

from apps.apiForRent.models.booking import Booking



@receiver(post_save, sender=Booking)
@receiver(post_delete, sender=Booking)
def update_realty_availability(sender, instance, **kwargs):
  print('-----------signal')
  realty = instance.realty
  realty.update_availability()



