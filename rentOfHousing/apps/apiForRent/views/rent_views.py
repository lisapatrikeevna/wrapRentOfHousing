from django.contrib.auth.models import AnonymousUser
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status
from rest_framework.exceptions import PermissionDenied, NotFound
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.generics import RetrieveUpdateDestroyAPIView, ListCreateAPIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from ..models import Category, Realty
from ..serializers.categorySerializer import CategorySerializer
from ..serializers.realtySerializer import RealtySerializer, RealtyCreateUpdateSerializer


class RealtyPagination(PageNumberPagination):
    page_size = 6
    page_size_query_param = 'page_size'
    max_page_size = 50

    def get_paginated_response(self, data):
        return super().get_paginated_response(data).data | {'total_pages': self.page.paginator.num_pages, 'current_page': self.page.number, 'total_items': self.page.paginator.count}


class RealtyRetrieveUpdateDelete(RetrieveUpdateDestroyAPIView):
    queryset = Realty.objects.all()
    serializer_class = RealtySerializer
    # serializer_class = RealtyCreateUpdateSerializer



    def get_permissions(self):
        if self.request.method == 'DELETE':
            if isinstance(self.request.user, AnonymousUser):
                raise PermissionDenied("Authentication credentials were not provided.")
            return [IsAuthenticated()]  # Права уже учтены через middleware
        if self.request.method == 'PUT':
            if isinstance(self.request.user, AnonymousUser):
                raise PermissionDenied("Authentication credentials were not provided.")
            return [IsAuthenticated()]  # Права уже учтены через middleware
        return [AllowAny()]  # Для GET-запросов токен не требуется


    def get_object(self):
        pk=self.kwargs.get('pk')
        try:
            realty = Realty.objects.get(pk=pk, is_deleted=False)
        except Realty.DoesNotExist:
            raise NotFound(detail=f"this Realty with id = '{pk}' dont exist")
        return realty

    def delete(self, request, *args, **kwargs):
        realty_instance = self.get_object()

        # Проверяем, является ли текущий пользователь автором
        if realty_instance.author != request.user:
            raise PermissionDenied("You do not have permission to delete this object.")

        # Мягкое удаление
        realty_instance.is_deleted = True
        realty_instance.save()

        return Response(status=status.HTTP_204_NO_CONTENT)

        def patch(self, request, *args, **kwargs):
            realty_instance = self.get_object()
        user = request.user

        # Получаем действие из PATCH-запроса
        action = request.data.get('action')  # Ожидаем, что в запросе будет указано действие: 'add' или 'remove'

        if action == 'add':
            # Добавляем пользователя в избранное
            realty_instance.favorite.add(user)
            return Response(status=status.HTTP_200_OK)
        elif action == 'remove':
            # Удаляем пользователя из избранного
            realty_instance.favorite.remove(user)
            return Response(status=status.HTTP_200_OK)
        else:
            return Response({"detail": "Invalid action. Use 'add' or 'remove'."}, status=status.HTTP_400_BAD_REQUEST)




class RealtyListCreate(ListCreateAPIView):
    queryset = Realty.objects.all()
    serializer_class = RealtySerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['category', 'location', 'number_of_rooms', 'available', 'available_date', 'class_realty', 'square_footage','author']
    search_fields = ['description', 'title', 'location']
    ordering_fields = ['register_date', 'title']
    pagination_class = RealtyPagination
    # permission_classes = [AllowAny]
    # permission_classes = [IsAuthenticated]

    # Устанавливаем разные права для GET и POST запросов
    def get_permissions(self):
        # print(f'RealtyListCreate/Method: {self.request.method}')
        # print(f'Headers: {self.request.headers}')
        # POST-запросы требуют аутентификации
        if self.request.method == 'POST':
            if isinstance(self.request.user, AnonymousUser):
                raise PermissionDenied("Authentication credentials were not provided.")
            return [IsAuthenticated()]  # Права уже учтены через middleware
        return [AllowAny()]  # Для GET-запросов токен не требуется

    def create(self, request, *args, **kwargs):
        # print(f'RealtyListGetCreate/POST request headers: {request.headers}')
        print(f'------POST request.data: {request.data}')  # для проверки, что все данные приходят
        print(f'------POST request.FILES: {request.FILES}')  # для проверки файлов
        serializer = RealtySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print(f'Serializer errors: {serializer.errors}')  # Логирование ошибок сериализатора
            # Возвращаем ошибки с указанием полей
            return Response({'errors': serializer.errors, 'message': 'Validation error'}, status=status.HTTP_400_BAD_REQUEST)  # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        pagination = self.paginate_queryset(serializer.data)
        res = self.get_paginated_response(pagination)
        return Response({'data': res['results'], 'total_pages': res['total_pages'], 'current_page': res['current_page'], 'count': res['count']})


# Открытый доступ для всех пользователей
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