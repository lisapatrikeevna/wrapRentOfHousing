from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, re_path, include
from rest_framework.routers import DefaultRouter

from .views.booking_view import BookingViewSet
from .views.category_view import CategoryListView
from .views.filterOptionsView import FilterOptionsView
from .views.realtyRetrieveUpdateDelete_view import RealtyRetrieveUpdateDelete
from .views.rent_views import RealtyListCreate
from .views.userRealtylists import UserRealtyslists


router = DefaultRouter()
router.register(r'bookings', BookingViewSet, basename='booking')

urlpatterns = ([
    path('category/', CategoryListView.as_view(), name='category'),
    path('realty/', RealtyListCreate.as_view(), name='realty_list_get_post'),
    re_path(r'^realty/filterList/$', FilterOptionsView.as_view()),
    # Здесь (?P<pk>\d+) указывает, что мы ожидаем, что часть URL будет числом и что она будет передана как аргумент pk.
    re_path(r'^realty/(?P<pk>\d+)$', RealtyRetrieveUpdateDelete.as_view(), name='realty-detail'),
    path('realty/additional/', UserRealtyslists.as_view()),
    path('', include(router.urls)),

])
               # + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT))









