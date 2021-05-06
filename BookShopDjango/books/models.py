from django.db import models


def image_upload_path(instance, filename):
    return '/'.join(['covers', str(instance.title), filename])


# Класс модели  публикации новости
class Publisher(models.Model):

    publisher = models.CharField(max_length=100, default="undefined")


class Genre(models.Model):
    genre = models.CharField(max_length=250)

    def __str__(self):
        return self.genre


class Book(models.Model):
    LANGUAGES = (
        ('UA', 'Ukrainian'),
        ('EN', 'English'),
        ('RU', 'Russian'),
    )
    COVERS = (
        ('SC', 'Softcover'),
        ('HCIW', 'Hardcover with ImageWrap'),
        ('HCDJ', 'Hardcover with Dust Jacket'),
    )
    title = models.CharField(max_length=100)
    author = models.CharField(max_length=250)
    description = models.CharField(max_length=3000)
    isbn = models.CharField(max_length=25, default="Undefined")  # ######
    genre = models.ManyToManyField(Genre)  # ######
    publish_year = models.IntegerField()
    number_of_pages = models.IntegerField(default=0)  # ######
    publisher = models.ForeignKey(Publisher, on_delete=models.CASCADE, related_name="book_publisher")
    language = models.CharField(max_length=2, choices=LANGUAGES)  # ######
    cover = models.CharField(max_length=5, choices=COVERS)  # ######
    stock = models.IntegerField()
    price = models.IntegerField()
    image = models.ImageField(max_length=100, upload_to=image_upload_path, default="pic_absent.jpg")
