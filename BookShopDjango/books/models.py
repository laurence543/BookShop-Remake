from django.db import models


# Класс модели  публикации новости
class Publisher(models.Model):

    publisher = models.CharField(max_length=100, default="undefined")


class Book(models.Model):
    title = models.CharField(max_length=100)
    author = models.CharField(max_length=250)
    description = models.CharField(max_length=1024)
    publish_year = models.IntegerField()
    publisher = models.ForeignKey(Publisher, on_delete=models.CASCADE, related_name="book_publisher")
    image = models.CharField(max_length=100, default=False)
    stock = models.IntegerField()
    price = models.IntegerField()
