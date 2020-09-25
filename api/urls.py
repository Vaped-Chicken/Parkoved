from django.urls import include, path
from rest_framework import routers

from . import views


router = routers.DefaultRouter()
router.register(r'park', views.ParkViewSet, basename='park')
router.register(r'attraction', views.AttractionViewSet, basename='attraction')
router.register(r'visitor', views.VisitorViewSet, basename='visitor')
router.register(r'queue', views.QueueViewSet, basename='queue')
router.register(r'restrictions', views.RestrictionsViewSet, basename='restrictions')

urlpatterns = [
    path('', include(router.urls)),
]
