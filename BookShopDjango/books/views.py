from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework import status, viewsets
from django.core.paginator import Paginator
from user import get_user
from .models import Book, Publisher
from .forms import CreateForm, EditForm, EditImageForm
from django.core.files.storage import FileSystemStorage
from time import strftime, localtime
from books.models import Book, Genre
from books.serializers import BookWithoutPublisherSerializer, \
                              BookListSerializer, \
                              PublisherSerializer, \
                              GenreSerializer
from rest_framework.response import Response
from rest_framework.generics import ListAPIView, \
                                    RetrieveAPIView, \
                                    CreateAPIView, \
                                    UpdateAPIView, \
                                    DestroyAPIView


# Create your views here.
class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookListSerializer
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ['title', 'genre__genre']
    ordering_fields = ['title', 'price']

    def get_queryset(self):
        qs = super().get_queryset()
        genre = self.request.query_params.get('genre')
        if genre is not None:
            qs = qs.filter(genre__genre=genre)
        return qs


class PublisherView(RetrieveAPIView):
    queryset = Publisher.objects.all()
    serializer_class = PublisherSerializer


class GenreViewSet(viewsets.ModelViewSet):
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer


@csrf_exempt
@api_view(['GET', 'POST'])
def index(request):
    if request.method == 'GET':
        ## books = Book.objects.all()
        publishers = Publisher.objects.all()
        # books_serializer = BookSerializer(books, many=True)
        ## books_serializer = BookListSerializer(books, many=True)
        publisher_serializer = PublisherSerializer(publishers, many=True)
        return Response(publisher_serializer.data)

    elif request.method == 'POST':
        publisher_serializer = PublisherSerializer(data=request.data)
        if publisher_serializer.is_valid():
            publisher_serializer.save()
            return Response(publisher_serializer.data, status=status.HTTP_201_CREATED)
        return Response(publisher_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def create(request):
    if request.method == 'POST':
        user = get_user(request)

        title = request.POST.get('title')
        author = request.POST.get('author')
        description = request.POST.get('description')
        publish_year = request.POST.get('publish_year')
        publisher = request.POST.get('publisher')
        stock = request.POST.get('stock')
        price = request.POST.get('price')

        image = request.FILES['image']
        fs = FileSystemStorage()
        filename = fs.save(image.name, image)
        file_url = fs.url(filename)

        book = Book(
            title=title,
            author=author,
            description=description,
            publish_year=publish_year,
            image=file_url,
            stock=stock,
            publisher=Publisher.objects.get(publisher=publisher),
            price=price,
        )
        book.save()

        color = 'green'
        message = 'Книга успішно додана'
        context = {
            'user': user,
            'color': color,
            'message': message
        }
        return render(request, 'books/create_res.html', context)
    else:
        user = get_user(request)
        form = CreateForm()
        context = {
            'user': user,
            'form': form
        }
        return render(request, 'books/create.html', context)


def delete(request, id):
    if request.method == 'POST':
        user = get_user(request)
        book = Book.objects.get(id=id)
        book.delete()
        context = {
            'user': user,
            'message': 'Книга успішно видалена'
        }
        return render(request, 'books/delete_res.html', context)
    else:
        user = get_user(request)
        book = Book.objects.get(id=id)
        context = {
            'user': user,
            'book': book
        }
        return render(request, 'books/delete.html', context)


def edit(request, id):
    book = Book.objects.get(id=id)
    if request.method == 'POST':
        user = get_user(request)

        title = request.POST.get('title')
        author = request.POST.get('author')
        description = request.POST.get('description')
        publish_year = request.POST.get('publish_year')
        publisher = request.POST.get('publisher')
        stock = request.POST.get('stock')
        price = request.POST.get('price')

        book = Book(
            id=id,
            title=title,
            author=author,
            description=description,
            publish_year=publish_year,
            stock=stock,
            publisher=Publisher.objects.get(publisher_title=publisher),
            price=price,
        )
        book.save()

        context = {
            'user': user,
        }
        return render(request, 'books/edit_res.html', context)
    else:  # request.method == 'GET':
        user = get_user(request)
        form = EditForm(initial={'title': book.title,
                                 'author': book.author,
                                 'description': book.description,
                                 'publish_year': book.publish_year,
                                 'publisher': book.publisher,
                                 'stock': book.stock,
                                 'price': book.price,
                                 'image': book.image,
                                 })
        context = {
            'user': user,
            'book': book,
            'form': form,
        }
        return render(request, 'books/edit.html', context)


def edit_image(request, id):
    book = Book.objects.get(id=id)
    if request.method == 'POST':
        user = get_user(request)

        image = request.FILES['image']
        fs = FileSystemStorage()
        filename = fs.save(image.name, image)
        file_url = fs.url(filename)

        book = Book(
            id=id, image=file_url
        )
        book.save(update_fields=["image"])
        context = {
            'user': user,
            'book': book,
        }
        return render(request, 'books/edit_image_res.html', context)
    else:  # elif request.method == 'GET':
        user = get_user(request)
        image_form = EditImageForm(initial={
            'image': book.image,
        })
        context = {
            'user': user,
            'image_form': image_form,
            'book': book,
        }
        return render(request, 'books/edit_image.html', context)


@csrf_exempt
@api_view(['GET', 'PUT', 'DELETE'])
def single(request, id):
    try:
        book = Book.objects.get(id=id)
    except Book.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        book_serializer = BookSerializer(book)
        return Response(book_serializer.data)
    elif request.method == 'PUT':
        book_serializer = BookSerializer(book, data=request.data)
        if book_serializer.is_valid():
            book_serializer.save()
            return Response(book_serializer.data)
        return Response(book_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        book.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
