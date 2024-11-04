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


class CustomUserCreate(generics.CreateAPIView):
    queryset = CustomUser.objects.all()  # Используем для создания новых пользователей
    serializer_class = CustomUserSerializer
    permission_classes = [AllowAny]  # Разрешаем доступ всем пользователям

    def create(self, request, *args, **kwargs):
        # super() используется для вызова методов родительского класса.автоматически определяет, какой класс является родительским
        response = super().create(request, *args, **kwargs)
        user = CustomUser.objects.get(id=response.data['id'])

        # # Создаем JWT токены
        # refresh = RefreshToken.for_user(user)
        # access_token = str(refresh.access_token)
        # refresh_token = str(refresh)
        #
        #
        # # Добавляем токены в cookies
        # response.set_cookie(
        #     'access_token', access_token,
        #     httponly=True,
        #     secure=True,
        #     max_age=timedelta(minutes=25)  # Срок жизни access-токена
        # )
        # response.set_cookie(
        #     'refresh_token', refresh_token,
        #     httponly=True,
        #     secure=True,
        #     max_age=timedelta(days=7)  # Срок жизни refresh-токена
        # )
        response=get_users_token(user,response)
        # Добавляем токены в ответ
        # response.data['access_token'] = access_token
        # response.data['refresh_token'] = refresh_token
        response.data = {
            # 'access_token': access_token,
            # 'refresh_token': refresh_token,
            'user': {
                'id': user.id,
                'email': user.email,
                'username': user.username,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'phone': user.phone,
            }
        }

        return response


# Создание логгера
logger = logging.getLogger(__name__)


# Обработчик логина с JWT токенами
# class CustomTokenObtainPairView(TokenObtainPairView):
#     serializer_class = CustomTokenObtainPairSerializer
#
#     def post(self, request, *args, **kwargs):
#         try:
#             return super().post(request, *args, **kwargs)
#         except AuthenticationFailed as e:
#             logger.error("Authentication Failed: %s", str(e))
#             raise
#         response = Response(user)
#         return get_users_token(user,response)
class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
    # permission_classes = [AllowAny]  # Разрешаем доступ всем пользователям


    def post(self, request, *args, **kwargs):
        print('def post')
        try:
            # Вызываем родительский метод, который использует ваш сериализатор
            response = super().post(request, *args, **kwargs)
            print('CustomTokenObtainPairView post>response.data: ',response.data)

            # Получаем пользователя из сериализатора
            user = self.serializer_class().validate(request.data)
            print('Получаем пользователя из сериализатора: ',user)

            # Сериализуем данные пользователя
            user_data = CustomUserSerializer(user).data  # Сериализуем данные пользователя

            # Устанавливаем токены в cookies
            response = get_users_token(user, response)
            print('after get_users_token: ', response.data)

            # Убедимся, что response.data всегда словарь
            if not isinstance(response.data, dict):
                response.data = {}  # Создаем пустой словарь, если response.data не словарь

            # Обновляем response.data, добавляя данные пользователя
            #     response.data.update(user_data)
            response.data['user'] = user_data

            return response  # Возвращаем ответ с установленными токенами

        except AuthenticationFailed as e:
            logger.error("Authentication Failed: %s", str(e))
            raise


class GetMy(views.APIView):
    # Класс для получения текущего пользователя и токенов на основе refresh токена.
    permission_classes = [IsAuthenticated]  # Только для аутентифицированных пользователей

    def get(self, request):
        """Обрабатываем GET-запрос. Возвращает пользователя и новый токен. """
        print(request)
        user = request.user  # Получаем пользователя из токена
        # Генерируем новый access и refresh токены
        refresh = RefreshToken.for_user(user)

        # Возвращаем данные
        return Response({
            "access_token": str(refresh.access_token),
            "refresh_token": str(refresh),
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




