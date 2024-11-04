# файл: rentOfHousing/middleware/middleware.py
from django.utils.deprecation import MiddlewareMixin
from rest_framework_simplejwt.tokens import AccessToken
from django.contrib.auth import get_user_model
from django.contrib.auth.models import AnonymousUser


class CookieTokenAuthenticationMiddleware(MiddlewareMixin):
    def process_request(self, request):
        print('myMiddleware/CookieTokenAuthenticationMiddleware/process_request')
        access_token = request.COOKIES.get('access_token')
        print('myMiddleware/CookieTokenAuthenticationMiddleware/access_token',request.COOKIES, access_token)
        # print('myMiddleware/CookieTokenAuthenticationMiddleware/access_token',request.auth, access_token)
        if access_token:
            try:
                token = AccessToken(access_token)
                print('if access_token:', token)
                user_id = token['user_id']
                user = get_user_model().objects.get(id=user_id)
                request.user = user
            except Exception as e:
                print(f"Token validation error: {e}")
                request.user = AnonymousUser()
        else:
            request.user = AnonymousUser()
