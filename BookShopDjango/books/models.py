from django.db import models


# Класс модели  публикации новости
class Publisher(models.Model):

    def __str__(self):
        return self.publisher_title

    publisher_title = models.CharField(max_length=100, default="undefined")


class Language(models.Model):

    def __str__(self):
        return self.language

    language = models.CharField(max_length=50)


class Book(models.Model):
    title = models.CharField(max_length=100)
    author = models.CharField(max_length=250)
    description = models.CharField(max_length=1024)
    publish_year = models.IntegerField()
    publisher = models.ForeignKey(Publisher, on_delete=models.CASCADE)
    image = models.CharField(max_length=100, default=False)
    stock = models.IntegerField()
    price = models.IntegerField()
    language = models.ForeignKey(Language, on_delete=models.CASCADE)
