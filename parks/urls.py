from django.urls import path
from . import views


app_name='parks'

urlpatterns = [
    path('', views.MainIndexView.as_view()),
]
