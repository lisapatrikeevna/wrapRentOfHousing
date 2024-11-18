from django.contrib.auth.models import AnonymousUser
from rest_framework.exceptions import PermissionDenied
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from apps.apiForRent.models import Realty
from apps.apiForRent.serializers.realtyListSerializer import RealtyListSerializer
from apps.apiForRent.views.rent_views import RealtyPagination








class UserRealtyslists(ListAPIView):
  permission_classes = [IsAuthenticated]
  serializer_class = RealtyListSerializer
  pagination_class = RealtyPagination

  def get_queryset(self):
    user_id = self.request.user.id
    activity_type = self.request.query_params.get('type')  # Получаем тип активности из параметров
    print('----------activity_type', activity_type)

    if activity_type == 'views/':
      return Realty.objects.filter(views__in=[user_id])
    elif activity_type == 'favorite/':
      return Realty.objects.filter(favorite__in=[user_id])
    elif activity_type == 'reservations':
      return Realty.objects.filter(reservations__in=[user_id])

    # Если тип активности не указан, возвращаем пустой QuerySet
    return Realty.objects.none()

  def list(self, request, *args, **kwargs):
    queryset = self.get_queryset()
    serializer = self.get_serializer(queryset, many=True)
    pagination = self.paginate_queryset(serializer.data)
    res = self.get_paginated_response(pagination)
    return Response({
      'data': res['results'],
      'total_pages': res['total_pages'],
      'current_page': res['current_page'],
      'count': res['count']
    })








