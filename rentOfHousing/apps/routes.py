from django.urls import path, include

urlpatterns = [
    path('', include('apps.apiForRent.urls')),
    path('auth/', include('apps.user.urls')),
]






