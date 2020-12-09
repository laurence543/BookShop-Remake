from rest_framework import serializers
from books.models import Book, Publisher


class PublisherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Publisher
        fields = "__all__"


class BookSerializer(serializers.ModelSerializer):
    publisher = PublisherSerializer()

    class Meta:
        model = Book
        fields = ('id',
                  'title',
                  'author',
                  'publish_year',
                  'stock',
                  'price',
                  'publisher',
                  'image'
                  )

    def create(self, validated_data):
        publisher_data = validated_data.pop('publisher')

        instance = super().create(validated_data)

        serializer2 = PublisherSerializer(publisher_data, context=self.context, many=True)
        serializer2.is_valid(raise_exception=True)
        serializer2.save()

        return instance

    def update(self, instance, validated_data):
        pass


class BookListSerializer(serializers.ModelSerializer):
    publisher = serializers.CharField(source="publisher.publisher")

    class Meta:
        model = Book
        fields = ('id',
                  'title',
                  'author',
                  'publish_year',
                  'stock',
                  'price',
                  'publisher',
                  'image'
                  )