from rest_framework import serializers
from books.models import Book


class BookSerializer(serializers.ModelSerializer):
    language = serializers.CharField(source="language.language")
    publisher = serializers.CharField(source='publisher.publisher_title')

    class Meta:
        model = Book
        fields = ('id',
                  'title',
                  'author',
                  'publish_year',
                  'stock',
                  'price',
                  'language',
                  'publisher',
                  'image'
                  )
