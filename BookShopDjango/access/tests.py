from django.test import TestCase
from .models import User, Order, Order_content
from books.models import Book, Publisher


# Create your tests here.
class UserModelTest(TestCase):

    @classmethod
    def setUpTestData(cls):
        User.objects.create(
            username='Fant1987',
            first_name='Fant',
            last_name='Late',
            email='fant87@ukr.net',
            gender='M',
            birth_date='1990-07-18',
            tel=503520232,
            location='Lisova street, Kyiv city',
        )

    def test_user_content(self):
        user = User.objects.get(id=1)
        expected_object_location = f'{user.location}'
        self.assertEquals(expected_object_location, 'Lisova street, Kyiv city')


class OrderCreationTest(TestCase):
    """
        Order And Order_content Model Test
    """

    @classmethod
    def setUpTestData(cls):
        publisher = Publisher.objects.create(publisher='Some Test publisher')
        book1 = Book.objects.create(
            title='Some Test Book',
            author='Aadwad',
            description='Adwadad',
            publish_year=2021,
            stock=3,
            price=120,
            publisher=publisher
        )
        book2 = Book.objects.create(
            title='Some Test Book2',
            author='Gdad',
            description='Dwdadafadwd',
            publish_year=2021,
            stock=3,
            price=120,
            publisher=publisher
        )
        user = User.objects.create(
            username='fafalya543',
            first_name='Alex',
            last_name='Doe',
            email='alex12355@gmail.com',
            gender='F',
        )
        order = Order.objects.create(user=user)
        Order_content.objects.create(
            order=order,
            book=book1,
            amount=3
        )
        Order_content.objects.create(
            order=order,
            book=book2,
            amount=4
        )

    def test_order_creation_content(self):
        user = User.objects.get(id=1)
        order = Order.objects.get(id=1)
        order_content = Order_content.objects.filter(order=order)
        expected_user_username = f'{user.username}'
        expected_order_content_amount = f'{order_content[0].amount}'
        self.assertEquals(expected_user_username, 'fafalya543')
        self.assertEquals(expected_order_content_amount, 3)
