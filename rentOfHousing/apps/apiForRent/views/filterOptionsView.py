from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.apiForRent.models import Realty





class FilterOptionsView(APIView):
  permission_classes = [AllowAny]  # Открытый доступ для всех пользователей

  def get(self, request):
    categories = Realty.objects.values_list('category', flat=True).distinct()
    locations = Realty.objects.values_list('location', flat=True).distinct()
    number_of_rooms = Realty.objects.values_list('number_of_rooms', flat=True).distinct()
    available = Realty.objects.values_list('available', flat=True).distinct()
    available_dates = Realty.objects.values_list('available_date', flat=True).distinct()
    class_realty = Realty.objects.values_list('class_realty', flat=True).distinct()
    square_footage = Realty.objects.values_list('square_footage', flat=True).distinct()

    return Response({'categories': list(categories), 'locations': list(locations), 'number_of_rooms': list(number_of_rooms), 'available': list(available), 'available_dates': list(available_dates), 'class_realty': list(class_realty), 'square_footage': list(square_footage), })









