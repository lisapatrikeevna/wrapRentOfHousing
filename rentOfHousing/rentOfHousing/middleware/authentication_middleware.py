# файл: rentOfHousing/middleware/middleware.py
from django.utils.deprecation import MiddlewareMixin
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework_simplejwt.tokens import AccessToken, RefreshToken
from django.contrib.auth import get_user_model
from django.contrib.auth.models import AnonymousUser
from rest_framework.request import Request
from rest_framework.response import Response
from datetime import datetime


class CookieTokenAuthenticationMiddleware1(MiddlewareMixin):
    def process_request(self, request):
        access_token = request.COOKIES.get('access_token')
        print('myMiddleware/CookieTokenAuthenticationMiddleware/access_token',request.COOKIES, access_token)
        if access_token:
            try:
                token = AccessToken(access_token)
                print('if access_token:', token)
                user_id = token['user_id']
                user = get_user_model().objects.filter(id=user_id).first()
                request.user = user
                print(f"Authenticated user: {request.user}")
            except Exception as e:
                print(f"Token validation error: {e}")
                request.user = AnonymousUser()
        else:
            request.user = AnonymousUser()



class CookieTokenAuthenticationMiddleware(MiddlewareMixin):
    def process_request(self, request: Request, **kwargs):
        access_token = request.COOKIES.get('access_token')
        refresh_token = request.COOKIES.get('refresh_token')
        print(f"Access Token: {access_token}, Refresh Token: {refresh_token}")


        if access_token:
            try:
                token = AccessToken(access_token)
                if datetime.fromtimestamp(token['exp']) < datetime.now():
                    print("Access token is expired")
                    raise TokenError('Token is expired')
                request.META['HTTP_AUTHORIZATION'] = f"Bearer {access_token}"
                print(f"Access Token is valid: {access_token}")

            except TokenError:
                print("Access token is invalid, attempting to refresh...")
                new_access_token = self.refresh_access_token(refresh_token)

                if new_access_token:
                    request.META['HTTP_AUTHORIZATION'] = f"Bearer {new_access_token}"
                    request._new_access_token = new_access_token
                    access_expiry = AccessToken(new_access_token)['exp']
                    print(f"New Access Token generated: {new_access_token}, Expiry: {access_expiry}")
                else:
                    print("Refresh token is invalid, clearing cookies...")
                    self.clear_jwt_cookies(request)

        elif refresh_token:
            print("Refresh Token found, attempting to get a new access token...")
            new_access_token = self.refresh_access_token(refresh_token)

            if new_access_token:
                request.META['HTTP_AUTHORIZATION'] = f"Bearer {new_access_token}"
                request._new_access_token = new_access_token
                access_expiry = AccessToken(new_access_token)['exp']
                print(f"New Access Token generated: {new_access_token}, Expiry: {access_expiry}")
            else:
                print("Refresh token is invalid, clearing cookies...")
                self.clear_jwt_cookies(request)

    def process_response(self, request: Request, response: Response, **kwargs):
        new_access_token = getattr(request, '_new_access_token', None)

        if new_access_token:
            access_expiry = AccessToken(new_access_token)['exp']
            print(f"Setting cookie with token: {new_access_token} and expiry: {access_expiry}")
            response.set_cookie(
                key='access_token',
                value=new_access_token,
                httponly=True,
                secure=True,
                samesite='None',
                expires=datetime.fromtimestamp(access_expiry)
            )
        return response

    def refresh_access_token(self, refresh_token):
        try:
            refresh = RefreshToken(refresh_token)
            new_access_token = str(refresh.access_token)
            print(f"Successfully refreshed token: {new_access_token}")
            return new_access_token
        except TokenError:
            print("Failed to refresh token, invalid refresh token.")
            return None

    def clear_jwt_cookies(self, request: Request):
        print("Clearing JWT cookies.")
        request.COOKIES.pop('access_token', None)
        request.COOKIES.pop('refresh_token', None)






