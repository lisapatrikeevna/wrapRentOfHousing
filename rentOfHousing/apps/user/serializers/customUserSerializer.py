import logging

from django.contrib.auth import authenticate
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from apps.user.models import CustomUser


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'email', 'username', 'first_name', 'last_name', 'password', 'phone')
        extra_kwargs = {'password': {'write_only': True}}

    def validate_phone(self, value):
        if not value:
            return None
        if CustomUser.objects.filter(phone=value).exists():
            # if value and CustomUser.objects.filter(phone=value).exists():
            raise serializers.ValidationError("This phone number is already in use.")
        return value

    def validate_username(self, value):
        if CustomUser.objects.filter(username=value).exists():
            raise serializers.ValidationError("Пользователь с таким именем уже существует.")
        return value

    def validate_email(self, value):
        if CustomUser.objects.filter(email=value).exists():
            raise serializers.ValidationError("Пользователь с таким email уже существует.")
        return value

        # def validate_rating(self, value):  #     """  #     Проверка, что рейтинг находится в допустимых пределах.  #     """  #     if value < 1 or value > 5:  #         raise serializers.ValidationError("Rating must be between 1 and 5.")  #     return value

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = CustomUser(**validated_data)
        user.set_password(password)
        user.save()
        return user


# Создание логгера
# logger = logging.getLogger(__name__)
logger = logging.getLogger('django.db.backends')
logger.setLevel(logging.DEBUG)
logger.addHandler(logging.StreamHandler())


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):

    # @classmethod
    # def get_token(cls, user):
    #     print('get_token user ', user)
    #     token = super().get_token(user)
    #     # Добавляем дополнительные данные к токену
    #     token['email'] = user.email
    #     token['username'] = user.username
    #     # token['phone'] = user.phone if user.phone else None
    #     # token['avatar'] = user.avatar.url if user.avatar else None
    #     return token

    def validate(self, attrs):
        print('CustomTokenObtainPairSerializer > attrs: ',attrs)
        username_or_email = attrs.get('username') or attrs.get('email')
        password = attrs.get('password')

        # Проверяем, заполнены ли оба поля
        if not username_or_email:
            raise serializers.ValidationError('Username (or email) is required.')
        if not password:
            raise serializers.ValidationError('Password is required.')

        # Находим пользователя по email или username
        if '@' in username_or_email:
            user = CustomUser.objects.filter(email=username_or_email).first()
        else:
            user = CustomUser.objects.filter(username=username_or_email).first()

        if user is None:
            raise serializers.ValidationError('User not found.')

        print(f"Trying to authenticate: {username_or_email}")
        # Аутентификация пользователя
        user = authenticate(username=user.username, password=password)
        print(f"User after authentication: {user}")

        # Если аутентификация не удалась
        if user is None or not user.is_active:
            logger.error("Authentication Failed: No active account found for username: %s", username_or_email)
            raise serializers.ValidationError('Invalid credentials or user is inactive')

        return user













# response = ?
        #
        # return get_users_token(user, response)

        # Получаем токен для пользователя
        # refresh = self.get_token(user)

        # print(f"Refresh Token: {refresh}")
        #
        # data = {'refresh_token': str(refresh), 'access_token': str(refresh.access_token), 'user': {'email': user.email, 'username': user.username, 'phone': user.phone, 'avatar': user.avatar.url if user.avatar and hasattr(user.avatar, 'url') else None}}
        #
        # return data


