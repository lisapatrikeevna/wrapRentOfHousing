from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from apps.apiForRent.models.booking import Booking



class BookingSerializer(serializers.ModelSerializer):
      class Meta:
            model = Booking
            fields = '__all__'
            read_only_fields = ('id',)

      # enant = serializers.PrimaryKeyRelatedField(queryset=Profile.objects.filter(user_type="tenant"),)
      # tenant = serializers.PrimaryKeyRelatedField(read_only=True)
      # is_confirmed = serializers.BooleanField(read_only=True)
      # listing_owner = serializers.ReadOnlyField(source="listing.owner.user.email")
      #
      # class Meta:
      #       model = Booking
      #       fields = "__all__"
      #
      # def create(self, validated_data):
      #       validated_data["tenant"] = self.context["request"].user.profile
      #       return super().create(validated_data)

      def validate(self, data):
            """
            Validate that the booking dates do not overlap with an existing booking for the same listing.
            """
            realty = data["realty"]
            start_date = data["start_date"]
            end_date = data["end_date"]
            # is_confirmed = data['is_confirmed']

            # Check for overlapping bookings
            overlapping_bookings = Booking.objects.filter(
                  realty=realty,
                  end_date__gte=start_date,  # Existing booking ends after the new booking starts
                  start_date__lte=end_date,  # Existing booking starts before the new booking ends
            ).exclude(id=self.instance.id if self.instance else None)

            if overlapping_bookings.exists():
                  raise ValidationError(
                        "This listing already has a booking within the specified date range."
                  )

            return data
