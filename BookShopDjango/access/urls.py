from django.urls import path
from . import views

urlpatterns = [
    path('entry', views.entry, name='entry'),
    path('registration', views.reg, name='reg'),

]