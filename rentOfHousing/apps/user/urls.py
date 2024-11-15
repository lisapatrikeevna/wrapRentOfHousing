from django.urls import path

from apps.user.views.getMy_view import GetMy
from apps.user.views.login_view import CustomTokenObtainPairView
from apps.user.views.logout_view import LogoutUserView
from apps.user.views.register_view import CustomUserCreate
# from rest_framework_simplejwt.views import TokenRefreshView

from apps.user.views.token_view import CustomTokenRefreshView
# from apps.user.views.views import CustomTokenObtainPairView, CustomUserCreate, GetMy

urlpatterns = [
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('register/', CustomUserCreate.as_view(), name='user_register'),
    # path('refreshToken/', TokenRefreshView.as_view(), name='token_refresh'),
    path('refreshToken/', CustomTokenRefreshView.as_view(), name='token_refresh'),
    path('me/', GetMy.as_view(), name='me'),
    path('logout/', LogoutUserView.as_view(), name='logout'),
]










