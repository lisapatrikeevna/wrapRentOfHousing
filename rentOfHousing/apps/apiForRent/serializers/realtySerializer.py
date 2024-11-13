from decimal import Decimal

from rest_framework import serializers

from apps.apiForRent.models import *


class RealtyFilesSerializer(serializers.ModelSerializer):
    class Meta:
        model = RealtyFiles
        fields = ['file_name', 'path']


class RealtyDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = RealtyDetail
        fields = '__all__'


class RealtySerializer(serializers.ModelSerializer):
    price = serializers.DecimalField(max_digits=10, decimal_places=2, min_value=Decimal('0.00'))
    details = RealtyDetailSerializer(required=False)
    realtyFiles = RealtyFilesSerializer(many=True, required=False)  # Добавляем поле для файлов

    class Meta:
        model = Realty
        fields = '__all__'
        read_only_fields = ['register_date', 'rating']

    def create(self, validated_data):
        details_data = validated_data.pop('details')
        # details_data = validated_data.pop('details', None)
        files_data = validated_data.pop('realtyFiles', [])  # Извлекаем данные о файлах

        # Создаем запись недвижимости
        realty_instance = Realty.objects.create(**validated_data)

        # Если данные о деталях были предоставлены, создаем их
        if details_data:
            RealtyDetail.objects.create(realty=realty_instance, **details_data)

        # Если данные о файлах были предоставлены, создаем их
        for file_data in files_data:
            RealtyFiles.objects.create(realty=realty_instance, **file_data)

        return realty_instance


class RealtyCreateUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Realty
        fields = '__all__'
        read_only_fields = ['register_date', ]
