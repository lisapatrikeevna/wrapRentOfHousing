from datetime import timedelta
from rest_framework_simplejwt.tokens import RefreshToken
from apps.user.models import CustomUser


def get_users_token(user,response):
    print('get_users_token user, response: ', user, response)
    # Создаем JWT токены
    refresh = RefreshToken.for_user(user)
    access_token = str(refresh.access_token)
    refresh_token = str(refresh)

# Убедитесь, что флаг secure установлен в True,
    # если ваше приложение работает через HTTPS.
    # Если вы тестируете локально без HTTPS, установите secure=False.
    # Добавляем токены в cookies
    response.set_cookie(
        'access_token', access_token,
        httponly=True,
        # httponly=True,
        secure=False, # Убедитесь, что это True на продакшене
        samesite='None',
        max_age=timedelta(minutes=25)  # Срок жизни access-токена
    )
    response.set_cookie(
        'refresh_token', refresh_token,
        httponly=True,
        secure=False,
        samesite='None',
        # samesite='Lax',
        max_age=timedelta(days=7)  # Срок жизни refresh-токена
    )

    print('get_users_token after add setCookies, response: ', response.data)
    return response















