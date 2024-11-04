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


class GetMy(views.APIView):
    # Класс для получения текущего пользователя и токенов на основе refresh токена.
    permission_classes = [IsAuthenticated]  # Только для аутентифицированных пользователей

    def get(self, request):
        """Обрабатываем GET-запрос. Возвращает пользователя и новый токен. """
        print(request)
        response = super().create(request, *args, **kwargs)
        user = request.user  # Получаем пользователя из токена
        # Генерируем новый access и refresh токены
        # refresh = RefreshToken.for_user(user)


        response=get_users_token(user,response)
        # Возвращаем данные
        return Response({
            # "access_token": str(refresh.access_token),
            # "refresh_token": str(refresh),
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "first_name": user.first_name,
                "last_name": user.last_name,
                "created": user.date_joined,
                # "updated": user.updated,
                'avatar': user.avatar.url if user.avatar and hasattr(user.avatar, 'url') else None,
                "phone": user.phone if user.phone else None,
            }, }, status=status.HTTP_200_OK)
