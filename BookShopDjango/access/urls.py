from django.urls import path
from . import views
from .views import ProfileAPI, ProfileOrdersAPI, OrderAPI, CheckoutAPI, AllOrdersAPI  # , UserViewSet
from rest_framework.routers import DefaultRouter

# router = DefaultRouter()
# router.register(r'api', UserViewSet, basename='books')
# urlpatterns = router.urls

urlpatterns = [
    path('api/profile', ProfileAPI.as_view(), name='profile'),
    path('api/profile_orders', ProfileOrdersAPI.as_view(), name='profile_orders'),
    path('api/order', OrderAPI.as_view(), name='order'),
    path('api/checkout', CheckoutAPI.as_view(), name='checkout'),
    path('api/all_orders', AllOrdersAPI.as_view(), name='all_orders'),  # manager_control_panel
    # path('entry', views.entry, name='entry'),
    # path('registration', views.reg, name='reg'),
    # path('exit_', views.exit_, name='exit_'),
    # path('profile', views.profile, name='profile'),
]
