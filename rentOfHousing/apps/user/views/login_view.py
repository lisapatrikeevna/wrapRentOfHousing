import logging
from datetime import timedelta

from rest_framework import views, status, generics
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView

from apps.user.models import CustomUser
from apps.user.serializers.customUserSerializer import CustomUserSerializer, CustomTokenObtainPairSerializer
from apps.user.utils import get_users_token

# Создание логгера
logger = logging.getLogger(__name__)


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        try:
            response = super().post(request, *args, **kwargs)
            user = self.serializer_class().validate(request.data)
            user_data = CustomUserSerializer(user).data
            user_data = user_data.favorite_properties
            response = get_users_token(user, response)

            if not isinstance(response.data, dict):
                response.data = {}

            response.data['user'] = user_data
            return response

        except AuthenticationFailed as e:
            logger.error("Authentication Failed: %s", str(e))
            raise
