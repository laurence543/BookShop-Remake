from django.db import models
from django.contrib.auth.models import AbstractUser  # , User
from books.models import Book


# Create your models here.
class User(AbstractUser):
    GENDERS = (
        ('M', 'Male'),
        ('F', 'Female'),
        ('O', 'Other'),
    )

    gender = models.CharField(max_length=1, choices=GENDERS, null=True)
    birth_date = models.DateField(null=True)
    tel = models.BigIntegerField(null=True)
    location = models.CharField(max_length=150, null=True)
    status = models.CharField(max_length=50, default="customer")
    modified_at = models.DateTimeField(auto_now=True)


class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # User
    order_date = models.DateTimeField(auto_now_add=True)


class Order_content(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    amount = models.IntegerField()
