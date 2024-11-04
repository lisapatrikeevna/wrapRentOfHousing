from django.db import models


class SoftDeleteRentManager(models.Manager):

    def get_queryset(self):
        return super().get_queryset().filter(is_deleted=False)




