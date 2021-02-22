from django.test import TestCase
from .models import Book, Publisher


# Create your tests here.
class PublisherModelTest(TestCase):

    @classmethod
    def setUpTestData(cls):
        Publisher.objects.create(publisher='Some Test publisher')

    def test_publisher_content(self):
        publisher = Publisher.objects.get(id=1)
        expected_object_name = f'{publisher.publisher}'
        self.assertEquals(expected_object_name, 'Some Test publisher')
