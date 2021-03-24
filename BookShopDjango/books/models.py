from django.db import models


def image_upload_path(instance, filename):
    return '/'.join(['covers', str(instance.title), filename])


# Класс модели  публикации новости
class Publisher(models.Model):

    publisher = models.CharField(max_length=100, default="undefined")


class Book(models.Model):
    title = models.CharField(max_length=100)
    author = models.CharField(max_length=250)
    description = models.CharField(max_length=1024)
    publish_year = models.IntegerField()
    publisher = models.ForeignKey(Publisher, on_delete=models.CASCADE, related_name="book_publisher")
    image = models.ImageField(max_length=100, upload_to=image_upload_path, default="pic_absent.jpg")
    stock = models.IntegerField()
    price = models.IntegerField()
