from django.shortcuts import render


# Create your views here.
# Представление для загрузки главной страницы сайта
def index(request):
    return render(request, 'common_tabs/index.html')


def about(request):
    return render(request, 'common_tabs/about.html')


def contacts(request):
    return render(request, 'common_tabs/contacts.html')
