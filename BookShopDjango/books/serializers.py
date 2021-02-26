from rest_framework import serializers
from books.models import Book, Publisher


class BookWithoutPublisherSerializer(serializers.ModelSerializer):

    class Meta:
        model = Book
        exclude = ('publisher',)


class PublisherSerializer(serializers.ModelSerializer):
    book_publisher = BookWithoutPublisherSerializer(many=True)

    class Meta:
        model = Publisher
        # fields = "__all__"
        fields = ('id', 'publisher')

    def create(self, validated_data):
        books_data = validated_data.pop('book_publisher')
        publisher = Publisher.objects.create(**validated_data)
        for book in books_data:
            Book.objects.create(publisher=publisher, **book)
        return publisher


class BookListSerializer(serializers.ModelSerializer):
    publisher = serializers.CharField(source="publisher.publisher")

    class Meta:
        model = Book
        fields = ('id',
                  'title',
                  'author',
                  'description',
                  'publish_year',
                  'stock',
                  'price',
                  'publisher',
                  'image'
                  )

    def create(self, validated_data):
        chosen_publisher = Publisher.objects.get(publisher=validated_data['publisher']['publisher'])
        validated_data['publisher'] = chosen_publisher
        Book.objects.create(**validated_data)
        return validated_data

    def update(self, instance, validated_data):
        chosen_publisher = Publisher.objects.get(publisher=validated_data['publisher']['publisher'])
        validated_data['publisher'] = chosen_publisher
        instance.title = validated_data.get('title', instance.title)
        instance.author = validated_data.get('author', instance.author)
        instance.description = validated_data.get('description', instance.description)
        instance.publish_year = validated_data.get('publish_year', instance.publish_year)
        instance.stock = validated_data.get('stock', instance.stock)
        instance.price = validated_data.get('price', instance.price)
        instance.publisher = validated_data.get('publisher', instance.publisher)
        instance.image = validated_data.get('image', instance.image)
        instance.save()
        return instance
