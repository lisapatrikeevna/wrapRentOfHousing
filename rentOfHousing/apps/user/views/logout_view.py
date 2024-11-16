from rest_framework import status, generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.user.serializers.customUserSerializer import LogoutSerializer



# class LogoutUserView(APIView):
#     permission_classes = [IsAuthenticated]
#
#     def post(self, request, *args, **kwargs):
#         response = Response(status=status.HTTP_200_OK)
#         response.delete_cookie('access_token')
#         response.delete_cookie('refresh_token')
#         return response






class LogoutUserView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    # serializer_class = LogoutSerializer

    def post(self, request):
        response = Response(status=status.HTTP_205_RESET_CONTENT)
        response.delete_cookie('access_token')
        response.delete_cookie('refresh_token')
        return response
