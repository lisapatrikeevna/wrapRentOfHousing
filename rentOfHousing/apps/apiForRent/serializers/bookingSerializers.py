from rest_framework import serializers

from apps.apiForRent.models.booking import Booking



class BookingSerializer(serializers.ModelSerializer):
      class Meta:
            model = Booking
            fields = '__all__'
            read_only_fields = ('id',)

