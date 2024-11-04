from rest_framework.generics import ListCreateAPIView
from rest_framework.permissions import AllowAny

from apps.apiForRent.models import Category
from apps.apiForRent.serializers.categorySerializer import CategorySerializer





# Открытый доступ для всех пользователей
class CategoryListView(ListCreateAPIView):
    permission_classes = [AllowAny]
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


