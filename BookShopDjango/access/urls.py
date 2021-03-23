from django.urls import path
from . import views
from .views import ProfileAPI  # , UserViewSet
from rest_framework.routers import DefaultRouter

# router = DefaultRouter()
# router.register(r'api', UserViewSet, basename='books')
# urlpatterns = router.urls

urlpatterns = [
    path('api/profile', ProfileAPI.as_view(), name='profile'),
    # path('entry', views.entry, name='entry'),
    # path('registration', views.reg, name='reg'),
    # path('exit_', views.exit_, name='exit_'),
    # path('profile', views.profile, name='profile'),
]
