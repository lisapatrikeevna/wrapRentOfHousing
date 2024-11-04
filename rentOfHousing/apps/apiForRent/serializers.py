from decimal import Decimal

from rest_framework import serializers

from .models import Category, Autor, Realty





class AutorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Autor
        fields = ('last_name', 'first_name', 'birth_day', 'registration_date', 'rating', 'email', 'is_active', 'phone', 'autor_type')


class RealtySerializer(serializers.ModelSerializer):
    price = serializers.DecimalField(max_digits=10, decimal_places=2, min_value=Decimal('0.00'))  # Пример добавления min_value

    class Meta:
        model = Realty
        fields = '__all__'
