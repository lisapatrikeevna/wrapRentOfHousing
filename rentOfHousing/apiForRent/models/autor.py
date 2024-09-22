from django.db import models
from django.core.validators import RegexValidator

TYPE_AUTOR = [('owner', 'owner'), ('agent', 'agent'), ('rentner', 'rentner'), ]


class Autor(models.Model):
    last_name = models.CharField(max_length=50)
    first_name = models.CharField(max_length=50)
    birst_day = models.DateField('birst day')
    registration_date = models.DateField("Registration Date", auto_now_add=True)
    rating = models.DecimalField(default=0, max_digits=3, decimal_places=2)
    is_active = models.BooleanField(default=True)
    email = models.EmailField(unique=True)
    # phone = models.IntegerField(unique=True)
    phone_regex = RegexValidator(
        regex=r'^\+?1?\d{9,15}$',
        message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed."
    )
    phone = models.CharField(validators=[phone_regex], max_length=30, unique=True)  # Измените на CharField
    autor_type = models.CharField(max_length=20, choices=TYPE_AUTOR)

    def __str__(self):
        return self.last_name
