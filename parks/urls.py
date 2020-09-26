from django.urls import path
from . import views


app_name='parks'

urlpatterns = [
    path('', views.MainIndexView.as_view()),
    path('ivent', views.IventView.as_view()),
    path('profile', views.ProfileView.as_view()),
    path('test_map', views.TestMapView.as_view()),
]
