from django.utils import timezone

from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework.response import Response
from rest_framework import status


class CustomTokenRefreshView(TokenRefreshView):
    print('CustomTokenRefreshView start')
    def post(self, request, *args, **kwargs):
        # Считываем refresh_token из куков
        refresh_token = request.COOKIES.get('refresh_token')
        print('CustomTokenRefreshView/refresh_token ', refresh_token)
        if not refresh_token:
            return Response({"detail": "Refresh token not provided"}, status=status.HTTP_400_BAD_REQUEST)

        # Устанавливаем токен в заголовок
        request.META['HTTP_AUTHORIZATION'] = f'Bearer {refresh_token}'
        print('request.META[\'HTTP_AUTHORIZATION\'] ', request.META['HTTP_AUTHORIZATION'] )
        # Далее вызываем стандартную логику от родительского класса
        # return super().post(request, *args, **kwargs)
        # Переопределяем стандартную логику обновления токена
        data = {
            'refresh': refresh_token
        }
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)

        # Получаем новые токены
        tokens = serializer.validated_data

        # Устанавливаем новый refresh_token в куки
        response = Response(tokens, status=status.HTTP_200_OK)
        response.set_cookie(
            'refresh_token',
            tokens['refresh'],  # или токен, который вы хотите установить
            httponly=True,
            samesite='Lax',
            secure=False,  # Установите True, если используете HTTPS
            expires=timezone.now() + timezone.timedelta(days=7)  # Пример времени жизни кука
        )
        return response




