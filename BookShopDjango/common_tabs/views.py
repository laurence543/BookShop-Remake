from django.shortcuts import render
from user import get_user


# Create your views here.
# Представление для загрузки главной страницы сайта
def index(request):
    user = get_user(request)
    context = {'user': user}
    return render(request, 'common_tabs/index.html', context)


def about(request):
    user = get_user(request)
    context = {'user': user}
    return render(request, 'common_tabs/about.html', context)


def contacts(request):
    user = get_user(request)
    context = {'user': user}
    return render(request, 'common_tabs/contacts.html', context)
