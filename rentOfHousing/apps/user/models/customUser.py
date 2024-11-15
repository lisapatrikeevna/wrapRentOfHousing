from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator, MaxValueValidator, MinValueValidator
from django.db import models


class CustomUser(AbstractUser):
    rating = models.FloatField("rating (1-5)", null=True, blank=True, validators=[MinValueValidator(1), MaxValueValidator(5)],    help_text="min: 1, max: 5", )
    phone_regex = RegexValidator(regex=r"^\+?1?\d{9,15}$", message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed.", )
    phone = models.CharField(validators=[phone_regex], max_length=30, unique=True, null=True, blank=True)
    avatar = models.ImageField(upload_to="avatars", null=True, blank=True)

    # Переопределяем поля groups и user_permissions
    groups = models.ManyToManyField("auth.Group", related_name="customuser_set", blank=True, help_text="The groups this user belongs to. A user will get all permissions granted to each of their groups.", related_query_name="customuser", )
    user_permissions = models.ManyToManyField("auth.Permission", related_name="customuser_set", blank=True, help_text="Specific permissions for this user.", related_query_name="customuser",)

    def __str__(self):
        return self.username

    class Meta:
        ordering = ["username"]
