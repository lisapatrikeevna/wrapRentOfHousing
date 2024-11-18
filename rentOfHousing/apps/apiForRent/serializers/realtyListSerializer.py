from rest_framework import serializers
from decimal import Decimal
from apps.apiForRent.models import *
from rest_framework import serializers

from apps.apiForRent.models import *
from apps.apiForRent.serializers.realtyDetail_serializer import RealtyDetailSerializer



class RealtyCreateUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Realty
        fields = '__all__'
        read_only_fields = ['register_date', ]


# class RealtyDetailSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = RealtyDetail
#         fields = '__all__'


class RealtyFilesSerializer(serializers.ModelSerializer):
    class Meta:
        model = RealtyFiles
        fields = '__all__'


class RealtyUpdateSerializers(serializers.ModelSerializer):
    class Meta:
        model = Realty
        fields = '__all__'
        # Проверяем, есть ли пользователи для добавления в favorites
        # if favorite_users_ids:
        #     favorite_users = CustomUser.objects.filter(id__in=favorite_users_ids)
        #     realty_instance.favorite.set(favorite_users)  # Используем set()


class RealtyCreateSerializer(serializers.ModelSerializer):
    price = serializers.DecimalField(max_digits=10, decimal_places=2, min_value=Decimal('0.00'))
    details = RealtyDetailSerializer(required=False)

    class Meta:
        model = Realty
        fields = '__all__'
        read_only_fields = ['register_date', 'rating', 'views','favorite','reservations']

    def create(self, validated_data):
        details_data = validated_data.pop('details', None)
        realty_instance = Realty.objects.create(**validated_data)

        if details_data:
            details_serializer = RealtyDetailSerializer(data=details_data)
            details_serializer.is_valid(raise_exception=True)
            details_instance = details_serializer.save()

            realty_instance.details = details_instance
            realty_instance.save()

        return realty_instance


class RealtyForUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Realty
        fields = ('reservations', 'views', 'favorite')


class RealtyListSerializer(serializers.ModelSerializer):
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



# ------POST request.data: <QueryDict: {
# 'csrfmiddlewaretoken': ['FsdjEsD0mpIBoYOvvkMJfzVbXhvyiH3AZcwpsG4jBuYdAG9TXiUu5XtYicRnzUHw'],
# 'details.internet': ['no'],
# 'details.garage_or_parking': ['50 e/m'],
# 'details.balcony': [''],
# 'details.heating_type': [''],
# 'details.floor_number': ['23'],
# 'details.total_floors': ['12'],
# 'details.pet_friendly': ['true'],
# 'details.description': ['Das in der Katharinenvorstadt, direkt beim Würthmuseum gelegene 2 stöckige Haus wird ausschließlich von Ihnen zum Wohnen genutzt.\r\nEs befindet sich lediglich im Erdgeschoss eine separate gewerbliche Einheit.'],
# 'title': ['title review'],
# 'description': ['Für ein paar Stunden, Tage, ein Jahr oder länger?\r\nBei ShareYourSpace findest du eine große Auswahl an Büros, Schreibtischen und Meetingräumen, die du flexibel buchen kannst.'],
# 'location': ['Schwäbisch Hall'],
# 'price': ['2300.00'],
# 'number_of_rooms': ['34'],
# 'available': ['true'],
# 'available_date': ['2024-12-05'],
# 'class_realty': ['standard'], 'square_footage': ['234.0'], 'category': ['2'], 'author': ['6'], 'real_estate_image': [<InMemoryUploadedFile: images.jpeg (image/jpeg)>]}>


# !!!!!!!!!!!!!!!!!!!details_data {
# 'internet': 'no',
# 'garage_or_parking': '50 e/m',
# 'balcony': '',
# 'heating_type': '',
# 'air_conditioning': False,
# 'floor_number': 23,
# 'total_floors': 12,
# 'pet_friendly': True,
# 'furnished': False,
# 'description': 'Das in der Katharinenvorstadt, direkt beim Würthmuseum gelegene 2 stöckige Haus wird ausschließlich von Ihnen zum Wohnen genutzt.\r\nEs befindet sich lediglich im Erdgeschoss eine separate gewerbliche Einheit.'}



