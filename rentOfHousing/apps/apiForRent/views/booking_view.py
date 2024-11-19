from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet

from apps.apiForRent.models.booking import Booking
from apps.apiForRent.serializers.bookingSerializers import BookingSerializer



class BookingViewSet(ModelViewSet):
	queryset = Booking.objects.all()
	serializers_class = BookingSerializer
	permission_classes = [IsAuthenticated]

	def get_queryset(self):
		user = self.request.user
		return super().get_queryset().filter(user=user)

	def perform_create(self, serializer):
		serializer.save(user=self.request.user)

