from datetime import timedelta, datetime
from rest_framework import status
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from apps.apiForRent.models.booking import Booking
from apps.apiForRent.serializers.bookingSerializers import BookingSerializer



class BookingViewSet(ModelViewSet):
	queryset = Booking.objects.all()
	serializer_class = BookingSerializer
	permission_classes = [IsAuthenticated]

	def perform_create(self, serializer):
		realty_id = self.request.data['realty']
		start_date_str = self.request.data['start_date']
		end_date_str = self.request.data['end_date']

		# Преобразуем строки в объекты date
		start_date = datetime.strptime(start_date_str, '%Y-%m-%d').date()
		end_date = datetime.strptime(end_date_str, '%Y-%m-%d').date()

		list_bookings = Booking.objects.filter(realty_id=realty_id).values('start_date', 'end_date')
		if list_bookings.exists():
			for booking in list_bookings:
				booking_start = booking['start_date']
				booking_end = booking['end_date']

				# Проверка на пересечение
				if (booking_start <= start_date <= booking_end) or \
						(booking_start <= end_date <= booking_end) or \
						(start_date <= booking_start and end_date >= booking_end):
						print('------------------Overlapping booking exists with dates:', booking_start, booking_end)
						return Response(
							{"error": "This listing is already booked for the selected dates."},
							status=status.HTTP_400_BAD_REQUEST
						)

				# Если пересечений нет, сохраняем бронирование
		serializer.save()
