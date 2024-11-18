from rest_framework import serializers

from apps.apiForRent.models import RealtyDetail



class RealtyDetailSerializer(serializers.ModelSerializer):
  class Meta:
    model = RealtyDetail
    fields = '__all__'
