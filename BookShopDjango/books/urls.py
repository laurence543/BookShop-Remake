from django.urls import path
from .views import BookViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'api', BookViewSet, basename='books')

urlpatterns = router.urls
#     [
#     path('api/', views.BookView.as_view(), name='index'),
#     path('api/<int:pk>', views.BookDetailView.as_view(), name='single'),
#     path('api/create', views.BookCreateView.as_view(), name='create'),
#     path('api/<int:pk>/edit', views.BookUpdateView.as_view(), name='edit'),
#     path('api/<int:pk>/delete', views.BookDeleteView.as_view(), name='delete'),
#     # path('api/publishers', views.PublisherView.as_view(), name='publishers'),
#     # path('', views.BookAPIView.as_view(), name='index'),
#     # path('<int:pk>', views.DetailBook.as_view(), name='single'),
#     # path('', views.index, name='index'),
#     # path('<int:id>', views.single, name='single'),
#     path('create', views.create, name='create'),
#     path('delete/<int:id>', views.delete, name='delete'),
#     path('edit/<int:id>', views.edit, name='edit'),
#     path('edit/<int:id>/edit_image', views.edit_image, name='edit_image'),
# ]