from django.db import models

from apps.apiForRent.models import Realty
from apps.user.models import CustomUser


class Message(models.Model):
    sender = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='sent_messages')
    receiver = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='received_messages')
    property = models.ForeignKey(Realty, on_delete=models.CASCADE, null=True, blank=True)  # Связь с квартирой
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)


