from django.contrib.auth.models import AnonymousUser
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status
from rest_framework.exceptions import PermissionDenied, NotFound, ValidationError
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.generics import RetrieveUpdateDestroyAPIView, ListCreateAPIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework.views import APIView

from ..models import Realty
from ..serializers.realtyListSerializer import RealtyListSerializer, RealtyUpdateSerializers, RealtyCreateSerializer



class RealtyPagination(PageNumberPagination):
    page_size = 6
    page_size_query_param = 'page_size'
    max_page_size = 50

    def get_paginated_response(self, data):
        return super().get_paginated_response(data).data | {'total_pages': self.page.paginator.num_pages, 'current_page': self.page.number, 'total_items': self.page.paginator.count}


class RealtyListCreate(ListCreateAPIView):
    queryset = Realty.objects.all()
    serializer_class = RealtyListSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['category', 'location', 'number_of_rooms', 'available', 'available_date', 'class_realty', 'square_footage', 'author']
    search_fields = ['description', 'title', 'location', 'available_date']
    ordering_fields = ['register_date', 'title']
    pagination_class = RealtyPagination
    # permission_classes = [AllowAny]
    # permission_classes = [IsAuthenticated]

    def get_permissions(self):
        if self.request.method == 'POST':
            if isinstance(self.request.user, AnonymousUser):
                raise PermissionDenied("Authentication credentials were not provided.")
            return [IsAuthenticated()]
        return [AllowAny()]

    # def get_queryset(self):
    #     queryset = super().get_queryset()
    #     return queryset.prefetch_related('details')

    def create(self, request, *args, **kwargs):
        print(f'------POST request.data: {request.data}')  # для проверки, что все данные приходят
        print(f'------POST request.FILES: {request.FILES}')  # для проверки файлов
        serializer = RealtyCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            print('-------def create/ if serializer.is_valid(): ', serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print(f'Serializer errors: {serializer.errors}')  # Логирование ошибок сериализатора
            return Response({'errors': serializer.errors, 'message': 'Validation error'}, status=status.HTTP_400_BAD_REQUEST)

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        pagination = self.paginate_queryset(serializer.data)
        res = self.get_paginated_response(pagination)
        return Response({
            'data': res['results'],
            'total_pages': res['total_pages'],
            'current_page': res['current_page'],
            'count': res['count']
        })


# Открытый доступ для всех пользователей

