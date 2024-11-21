from django.apps import AppConfig


class ApiforrentConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apps.apiForRent'

    def ready(self):
        import apps.apiForRent.signals



