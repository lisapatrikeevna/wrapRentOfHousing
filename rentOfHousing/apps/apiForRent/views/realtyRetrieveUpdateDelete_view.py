from django.core.exceptions import PermissionDenied
from rest_framework import status
from rest_framework.exceptions import NotFound
from rest_framework.generics import RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework.response import Response

from apps.apiForRent.models import Realty
from apps.apiForRent.serializers.realtyListSerializer import RealtyUpdateSerializers, RealtyListSerializer
from apps.permissions import IsOwner



class RealtyRetrieveUpdateDelete(RetrieveUpdateDestroyAPIView):
  queryset = Realty.objects.all()
  serializer_class = RealtyUpdateSerializers
  permission_classes = [IsAuthenticatedOrReadOnly]
  lookup_field = "pk"
  # serializer_class = RealtyCreateUpdateSerializer

  def get_queryset(self):
    queryset = super().get_queryset()
    return queryset.select_related('favorite')


  def get_permissions(self):
      if self.request.method in ['DELETE', 'PUT']:
        return [IsOwner()]
      return super().get_permissions()


  def get_object(self):
    pk=self.kwargs.get('pk')
    try:
      realty = Realty.objects.get(pk=pk, is_deleted=False)
    except Realty.DoesNotExist:
      raise NotFound(detail=f"this Realty with id = '{pk}' dont exist")
    return realty

  def retrieve(self, request, *args, **kwargs):
    instance = self.get_object()
    serializer = RealtyListSerializer(instance)
    return Response(serializer.data)

  def delete(self, request, *args, **kwargs):
    realty_instance = self.get_object()
    if realty_instance.author != request.user:
      raise PermissionDenied("You do not have permission to delete this object.")
    realty_instance.is_deleted = True
    realty_instance.save()

    return Response(status=status.HTTP_204_NO_CONTENT)

  def patch(self, request, *args, **kwargs):
    realty_instance = self.get_object()

    if request.user.is_authenticated:
      favorite_user_id = request.data.get('favorite')
      reservations_user_id = request.data.get('reservations')
      views_user_id = request.data.get('views')

      if favorite_user_id:
        print('exist/if realty_instance.favorite.filter(id=favorite_user_id).exists()',realty_instance.favorite.filter(id=favorite_user_id).exists())
        if realty_instance.favorite.filter(id=favorite_user_id).exists():
          realty_instance.favorite.remove(favorite_user_id)
        else:
          print('else')
          realty_instance.favorite.add(favorite_user_id)
        return Response(status=status.HTTP_200_OK)
      elif reservations_user_id :
        if realty_instance.reservations.filter(id=reservations_user_id).exists():
          realty_instance.reservations.remove(reservations_user_id)
        else:
          realty_instance.reservations.add(reservations_user_id)
        return Response(status=status.HTTP_200_OK)
      elif views_user_id is not None:
        if realty_instance.views.filter(id=views_user_id).exists():
          pass
          # realty_instance.views.remove(views_user_id)
        else:
          # realty_instance.views.add(views_user_id)
          realty_instance.views.add(views_user_id)

        return Response(status=status.HTTP_200_OK)
      else:
        serializer = self.get_serializer(realty_instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(status=status.HTTP_200_OK)

    if request.data.get('rating'):
      if request.user not in realty_instance.reservations.all():
        return Response({"detail": "You do not have permission to modify this reservation."},status=status.HTTP_403_FORBIDDEN)

      oldRating = realty_instance.rating
      newRating = request.data.get('rating')

      if newRating is not None:
        newRating = float(newRating)

        averageRating = (oldRating + newRating) / 2

        realty_instance.rating = averageRating
        realty_instance.save()

        return Response({"rating": realty_instance.rating}, status=status.HTTP_200_OK)
      else:
        return Response({"detail": "New rating is not provided."}, status=status.HTTP_400_BAD_REQUEST)














