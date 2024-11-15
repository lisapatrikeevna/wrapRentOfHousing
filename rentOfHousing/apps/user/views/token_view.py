from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenRefreshView

from apps.user.utils import get_users_token


class CustomTokenRefreshView(TokenRefreshView):
    print('CustomTokenRefreshView start')
    def post(self, request, *args, **kwargs):
        # Считываем refresh_token из куков
        refresh_token = request.COOKIES.get('refresh_token')
        print('CustomTokenRefreshView/refresh_token ', refresh_token)
        if not refresh_token:
            return Response({"detail": "Refresh token not provided"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            token=RefreshToken(refresh_token)
            user_id=token['user_id']
            # user=get_user_model().objekts.get(id=user_id)
            user = get_user_model().objects.filter(id=user_id).first()
            if not user:
                return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)

            response=super().post(request,*args,**kwargs)
            # Удаляем старый refresh-токен
            response.delete_cookie('refresh_token')
            # response.delete_cookie('access_token')

            response = get_users_token(user,response)

            return response

        except Exception as err:
            return Response({"detail": "Invalid refresh token", "error": str(err)}, status=status.HTTP_401_UNAUTHORIZED)

# from rest_framework_simplejwt.views import TokenRefreshView
# from rest_framework.response import Response
# from rest_framework import status
# from rest_framework_simplejwt.tokens import RefreshToken
# from django.contrib.auth import get_user_model
# import logging
#
# logger = logging.getLogger(__name__)
#
# class CustomTokenRefreshView(TokenRefreshView):
#     def post(self, request, *args, **kwargs):
#         refresh_token = request.COOKIES.get('refresh_token')
#         logger.info('Received refresh_token: %s', refresh_token)
#
#         if not refresh_token:
#             return Response({"detail": "Refresh token not provided"}, status=status.HTTP_400_BAD_REQUEST)
#
#         try:
#             token = RefreshToken(refresh_token)
#             user_id = token['user_id']
#             user = get_user_model().objects.filter(id=user_id).first()
#
#             if not user:
#                 return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)
#
#             response = super().post(request, *args, **kwargs)
#             response = get_users_token(user, response)
#
#             return response
#
#         except Exception as e:
#             logger.error("Error refreshing token: %s", str(e))
#             return Response({"detail": "Invalid refresh token"}, status=status.HTTP_401_UNAUTHORIZED)















