# https://www.django-rest-framework.org/api-guide/generic-views/
#
# class BookListCreateView(GenericAPIView):
#     queryset = Book.objects.all()
#     serializer_class = BookSerializer
#
#     def get(self, request, *args, **kwargs):
#         books = self.get_queryset()
#         serializer = self.get_serializer(books, many=True)
#         return Response(serializer.data)
#
#     def post(self, request, *args, **kwargs):
#         serializer = self.get_serializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         serializer.save()
#         return Response(serializer.data, status=status.HTTP_201_CREATED)
#
#     def get(self, request):
#         books = Book.objects.all()
#         serializer = BookDetailSerializer(books, many=True)
#         return Response(serializer.data)
#
#     def post(self, request):
#         serializer = BookSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#
#
# class BookListCreateView():
#     books = self.get_queryset()
#     serializer = self.get_serializer(books, many=True)







# from django_filters import rest_framework as filters
# from .models import Realty
#
# class RealtyFilter(filters.FilterSet):
#     class Meta:
#         model = Realty
#         fields = {
#             'price': ['exact', 'lt', 'gt'],  # Пример полей для фильтрации
#             'location': ['exact', 'icontains'],
#             # Добавьте другие поля, по которым хотите фильтровать
#         }





# from django_filters.rest_framework import DjangoFilterBackend
# from rest_framework import filters
#
# class RealtyListGetCreate(ListCreateAPIView):
#     queryset = Realty.objects.all()
#     serializer_class = RealtySerializer
#     filter_backends = (DjangoFilterBackend, filters.OrderingFilter)
#     filterset_class = RealtyFilter
#     ordering_fields = '__all__'  # Позволяет сортировать по всем полям
#     ordering = ['id']  # Устанавливает порядок по умолчанию


# Пример использования
# GET /api/realty/?price__lt=100000&location__icontains=New























