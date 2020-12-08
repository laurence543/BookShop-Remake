from rest_framework import serializers
from books.models import Book, Publisher, Language


class LanguageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Language
        fields = "__all__"


class PublisherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Publisher
        fields = "__all__"


class BookSerializer(serializers.ModelSerializer):
    language = LanguageSerializer()
    publisher = PublisherSerializer()

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

    def create(self, validated_data):
        language_data = validated_data.pop('language')
        publisher_data = validated_data.pop('publisher')

        instance = super().create(validated_data)

        serializer = LanguageSerializer(language_data, context=self.context, many=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        serializer2 = PublisherSerializer(publisher_data, context=self.context, many=True)
        serializer2.is_valid(raise_exception=True)
        serializer2.save()

        return instance

    def update(self, instance, validated_data):
        pass


class BookListSerializer(serializers.ModelSerializer):
    language = serializers.CharField(source="language.language")
    publisher = serializers.CharField(source="publisher.publisher_title")

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