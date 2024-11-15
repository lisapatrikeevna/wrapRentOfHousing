from rest_framework import views
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from apps.apiForRent.models import Realty
from apps.user.serializers.customUserSerializer import CustomUserSerializer
from apps.user.utils import get_users_token
from apps.apiForRent.serializers.realtySerializer import RealtySerializer


class GetMy(views.APIView):
    # Класс для получения текущего пользователя и токенов на основе refresh токена.
    permission_classes = [IsAuthenticated]  # Только для аутентифицированных пользователей

    def get(self, request, *args, **kwargs):
        user = request.user  # Получаем текущего пользователя из токена
        print("GetMy/get/user:", user)

        # Получаем данные пользователя
        user_data = CustomUserSerializer(user).data

        # Получаем все избранные объекты недвижимости для пользователя

        favorite_properties = Realty.objects.filter(favorite=user)
        favorite_properties_data = RealtySerializer(favorite_properties, many=True).data

        # Получаем токены для пользователя и добавляем их в ответ
        response = get_users_token(user, Response())
        if not isinstance(response.data, dict):
            response.data = {}

        # Формируем и возвращаем окончательный ответ
        response.data['user'] = user_data
        response.data['favorite_properties'] = favorite_properties_data

        return response






