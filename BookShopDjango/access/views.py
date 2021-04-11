from django.shortcuts import render
from rest_framework import status, viewsets, generics, permissions
from rest_framework.permissions import IsAuthenticated
from .forms import RegForm, EntryForm
from .models import User, Order
from .serializers import UserProfileSerializer, OrderSerializer
from hashlib import md5
from time import strftime, localtime
from user import get_user


# class UserViewSet(viewsets.ModelViewSet):
#     permission_classes = (IsAuthenticated,)

class ProfileAPI(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = UserProfileSerializer

    def get_object(self):
        return self.request.user


class ProfileOrdersAPI(generics.ListAPIView):
    # permission_classes = [
    #     permissions.IsAuthenticated,
    # ]
    # queryset = Order.objects.all()
    # queryset = Order.objects.filter(user=self.request.user)
    serializer_class = OrderSerializer

    # def get_object(self):
    #     return self.request.user

    def get_queryset(self):
        return Order.objects.filter(user_id=self.request.user)


# Представлення для завантаження сторінки входу
def entry(request):
    if request.method == 'POST':
        # Отримання даних з форми:
        login = request.POST.get('login')
        pass1 = request.POST.get('pass1')
        hash_code = md5(pass1.encode())
        password = hash_code.hexdigest()

        # Сценарій авторизації:
        check = User.objects.filter(login=login, password=password)
        n = len(check)
        if n == 0:
            message = 'Користувач не знайдений!'
            color = 'red'
        else:
            request.session['user'] = login
            message = 'Авторизація пройшла успішно!'
            color = 'green'

        # Перевірка поточного статусу користувача:
        user = get_user(request)

        # Визначення контексту та завантаження сторінки:
        context = {
            'message': message,
            'color': color,
            'user': user
        }
        return render(request, 'access/entry_res.html', context)
    else:
        # Перевірка поточного статусу користувача:
        user = get_user(request)

        # Створення екземпляру форми та контексту:
        entry_form = EntryForm()
        context = {
            'form': entry_form,
            'user': user
        }
        return render(request, 'access/entry.html', context)


# Представлення для завантаження сторінки реєстрації
def reg(request):
    if request.method == 'POST':
        login = request.POST.get('login')
        pass1 = request.POST.get('pass1')
        pass2 = request.POST.get('pass2')
        email = request.POST.get('email')

        hash_code = md5(pass1.encode())
        password = hash_code.hexdigest()
        reg_date = strftime('%Y-%m-%d %H:%M:%S', localtime())
        status = 'usual'

        # Перевірка занятості логіна/пароля та реєстрація:
        select = User.objects.filter(login=login)
        n = len(select)
        if n > 0:
            message = 'Логін зайнятий!'
            color = 'red'
        elif pass1 != pass2:
            message = 'Паролі не співпадають!'
            color = 'red'
        else:
            user = User(
                login=login, password=password, email=email,
                reg_date=reg_date, status=status
            )
            user.save()
            message = 'Реєстрація успішно завершена'
            color = 'green'

        # Проверка текущего статуса пользователя:
        user = get_user(request)

        # Определение контекста и загрузка страницы:
        context = {
            'message': message,
            'color': color,
            'user': user
            # 'login': login,
            # 'pass1': pass1,
            # 'pass2': pass2,
            # 'email': email,
            # 'password': password,
            # 'reg_date': reg_date,
            # 'status': status
        }
        return render(request, 'access/reg_res.html', context)
    else:
        # Проверка текущего статуса пользователя:
        user = get_user(request)

        # Создание экземпляра формы и контекста:
        reg_form = RegForm()
        context = {
            'form': reg_form,
            'user': user
        }
        return render(request, 'access/reg.html', context)


# Представление для загрузки страницы выхода
def exit_(request):
    # Удаление пользователя из сессии:
    del request.session['user']

    # Загрузка страницы:
    user = get_user(request)

    context = {
        'user': user
    }
    return render(request, 'access/exit_.html', context)


# Представление для загрузки страницы профиля
def profile(request):
    user = get_user(request)

    context = {
        'user': user
    }
    return render(request, 'access/profile.html', context)
