from django.urls import path
from . import views

urlpatterns = [
    path('', views.BookAPIView.as_view(), name='index'),
    # path('', views.index, name='index'),
    path('<int:id>', views.single, name='single'),
    path('create', views.create, name='create'),
    path('delete/<int:id>', views.delete, name='delete'),
    path('edit/<int:id>', views.edit, name='edit'),
    path('edit/<int:id>/edit_image', views.edit_image, name='edit_image'),
]