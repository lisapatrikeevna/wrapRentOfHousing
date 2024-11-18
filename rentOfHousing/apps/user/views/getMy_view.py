from rest_framework import views
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from apps.apiForRent.models import Realty
from apps.user.serializers.customUserSerializer import CustomUserSerializer
from apps.user.utils import get_users_token
from apps.apiForRent.serializers.realtyListSerializer import RealtyListSerializer


class GetMy(views.APIView):
    # получениe текущего пользователя и токенов на основе refresh токена.
    permission_classes = [IsAuthenticated]  # Только для аутентифицированных пользователей

    def get(self, request, *args, **kwargs):
        user = request.user  # Получаем текущего пользователя из токена

        # Получаем данные пользователя
        user_data = CustomUserSerializer(user).data

        # Получаем токены для пользователя и добавляем их в ответ
        response = get_users_token(user, Response())
        if not isinstance(response.data, dict):
            response.data = {}
        # Формируем и возвращаем окончательный ответ
        response.data['user'] = user_data

        return response






