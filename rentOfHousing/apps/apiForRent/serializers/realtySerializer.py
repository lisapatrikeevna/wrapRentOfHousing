from decimal import Decimal

from rest_framework import serializers

from ..models import Realty


class RealtyDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Realty
        fields = '__all__'


class RealtySerializer(serializers.ModelSerializer):
    price = serializers.DecimalField(max_digits=10, decimal_places=2, min_value=Decimal('0.00'))  # Пример добавления min_value

    # detail = RealtyDetailSerializer(required=False)
    # detail = RealtyDetailSerializer(read_only=True, many=False)
    # autor = AutorSerializer(read_only=True)
    # category = CategorySerializer(required=True)
    # category = CategorySerializer(read_only=True)

    class Meta:
        model = Realty
        fields = '__all__'
        read_only_fields = ['register_date', 'rating']

    # def create(self, validated_data):  #     detail_data = validated_data.pop('detail', None)  # autor_data = validated_data.pop('autor')  # category_data = validated_data.pop('category')

    # Создание объектов  # autor = Autor.objects.create(**autor_data)  # category = Category.objects.create(**category_data)

    # Создание объекта Realty  # realty = Realty.objects.create(autor=autor, category=category, **validated_data)  #  # if detail_data:  #     RealtyDetail.objects.create(realty=realty, **detail_data)  #  # return realty


class RealtyCreateUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Realty
        fields = '__all__'
        read_only_fields = ['register_date', ]
