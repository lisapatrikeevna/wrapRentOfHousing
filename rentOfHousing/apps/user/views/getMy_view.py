from rest_framework import views
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from apps.user.serializers.customUserSerializer import CustomUserSerializer
from apps.user.utils import get_users_token


class GetMy(views.APIView):
    # Класс для получения текущего пользователя и токенов на основе refresh токена.
    permission_classes = [IsAuthenticated]  # Только для аутентифицированных пользователей

    def get(self, request, *args, **kwargs):
        print(request)
        response = Response()
        user = request.user  # Получаем пользователя из токена
        print("GetMy/get/user", user)
        user_data = CustomUserSerializer(user).data

        response = get_users_token(user,response)
        if not isinstance(response.data, dict):
            response.data = {}
        response.data['user'] = user_data

        return response





