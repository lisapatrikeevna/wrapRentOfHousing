from decimal import Decimal

from rest_framework import serializers

from apps.apiForRent.models import *
from apps.user.models import CustomUser


class RealtyCreateUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Realty
        fields = '__all__'
        read_only_fields = ['register_date', ]


class RealtyDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = RealtyDetail
        fields = '__all__'


    # def validate_details(self, value):
    #     """Валидация, чтобы проверить, что `details` является словарем."""
    #     if not isinstance(value, dict):
    #         raise serializers.ValidationError("Details must be a valid JSON object.")
    #     return value


class RealtyFilesSerializer(serializers.ModelSerializer):
    class Meta:
        model = RealtyFiles
        fields = '__all__'


# class RealtySerializer(serializers.ModelSerializer):
#     price = serializers.DecimalField(max_digits=10, decimal_places=2, min_value=Decimal('0.00'))
#     details = RealtyDetailSerializer(many=True, required=False)
#     realtyFiles = RealtyFilesSerializer(many=True, required=False)
#
#     class Meta:
#         model = Realty
#         fields = '__all__'
#         read_only_fields = ['register_date', 'rating', 'favorite', 'views']
#
#     def create(self, validated_data):
#         print('!!!!!!!!!!! Inside create:', validated_data)
#
#     # Обработка поля `details`
#         details_data = validated_data.pop('details', [])
#
#         # Если details уже является словарем, преобразуем его в список с одним элементом
#         if isinstance(details_data, dict):
#             details_data = [details_data]
#
#         print('Processed Details Data:', details_data)
#
#         # Извлекаем данные для realtyFiles
#         files_data = validated_data.pop('realtyFiles', [])
#         print('Processed Files Data:', files_data)
#
#         # Создаем объект Realty
#         realty_instance = Realty.objects.create(**validated_data)
#
#         # Обработка details
#         for detail in details_data:
#             if isinstance(detail, dict):
#                 RealtyDetail.objects.create(realty=realty_instance, **detail)
#
#         # Обработка realtyFiles
#         for file_data in files_data:
#             if isinstance(file_data, dict):
#                 RealtyFiles.objects.create(realty=realty_instance, **file_data)
#
#         return realty_instance


class RealtyUpdateSerializers(serializers.ModelSerializer):
    class Meta:
        model = Realty
        fields = '__all__'
        # Проверяем, есть ли пользователи для добавления в favorites
        # if favorite_users_ids:
        #     favorite_users = CustomUser.objects.filter(id__in=favorite_users_ids)
        #     realty_instance.favorite.set(favorite_users)  # Используем set()



class RealtyCreateSerializer(serializers.ModelSerializer):
    details = RealtyDetailSerializer(required=False)

    class Meta:
        model = Realty
        fields = '__all__'
        read_only_fields = ['register_date', 'rating', 'views','favorite','reservations']

    def create(self, validated_data):
        # Извлекаем данные для details
        details_data = validated_data.pop('details', None)
        # details_data = validated_data.pop('details', [])

        # Извлекаем favorite_users_ids, если они есть
        # favorite_users_ids = validated_data.pop('favorite', [])
        # views_users_ids = validated_data.pop('favorite', [])
        # favorite_users_ids = validated_data.pop('favorite', [])

        # Создаем объект недвижимости
        realty_instance = Realty.objects.create(**validated_data)

        # Если данные о деталях были переданы, создаем их
        if details_data:
            details_instance = RealtyDetail.objects.create(**details_data)
            # Привязываем объект RealtyDetail к Realty
            realty_instance.details = details_instance
            realty_instance.save()

        return realty_instance


class RealtyForUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Realty
        fields = ('reservations', 'views', 'favorite')


class RealtyListCreateSerializer(serializers.ModelSerializer):
    price = serializers.DecimalField(max_digits=10, decimal_places=2, min_value=Decimal('0.00'))
    # details = RealtyDetailSerializer(many=True, required=False)  # Используем many=True для списка
    realtyFiles = RealtyFilesSerializer(many=True, required=False)
    details = RealtyDetailSerializer(required=False)  # Здесь уже не many=True, так как OneToOne


    class Meta:
        model = Realty
        fields = '__all__'
        read_only_fields = ['register_date', 'rating']

    # def create(self, validated_data):
    #     print('!!!!!!!!!!!!!!!!!!!/def create(self, validated_data):', validated_data)
    #
    #     # Получаем данные для details как список
    #     details_data = validated_data.pop('details', [])
    #     # Извлекаем файлы
    #     files_data = validated_data.pop('realtyFiles', [])
    #     # Создаем объект недвижимости
    #     realty_instance = Realty.objects.create(**validated_data)
    #     # Если данные о деталях были переданы, создаем их
    #     for detail in details_data:
    #         # RealtyDetail.objects.create(details=realty_instance, **detail)
    #         RealtyDetail.objects.create(realty=realty_instance, **detail)
    #     # Если были переданы файлы, создаем их
    #     # for file_data in files_data:
    #     #     RealtyFiles.objects.create(realtyFiles=realty_instance, **file_data)
    #     #
    #     # return realty_instance

    #
    # def validate_details(self, value):
    #     """Валидация, чтобы проверить, что `details` является словарем."""
    #     if not isinstance(value, dict):
    #         raise serializers.ValidationError("Details must be a valid JSON object.")
    #     return value
