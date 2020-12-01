from django.shortcuts import render
from django.core.paginator import Paginator
from user import get_user
from .models import Book, Publisher, Language
from .forms import CreateForm, EditForm, EditImageForm
from django.core.files.storage import FileSystemStorage
from time import strftime, localtime


# Create your views here.
def index(request):
    user = get_user(request)
    books_x = Book.objects.all()
    paginator = Paginator(books_x, 2)
    page = request.GET.get('page')
    books = paginator.get_page(page)
    context = {'user': user,
               'books': books,
               }

    return render(request, 'books/index.html', context)


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
        language = request.POST.get('language')

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
            publisher=Publisher.objects.get(publisher_title=publisher),
            price=price,
            language=Language.objects.get(language=language),
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
        language = request.POST.get('language')

        book = Book(
            id=id,
            title=title,
            author=author,
            description=description,
            publish_year=publish_year,
            stock=stock,
            publisher=Publisher.objects.get(publisher_title=publisher),
            price=price,
            language=Language.objects.get(language=language),
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
                                 'language': book.language,
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


def single(request, id):
    user = get_user(request)
    book = Book.objects.get(id=id)
    context = {'user': user,
               'book': book,
               }
    return render(request, 'books/single.html', context)
