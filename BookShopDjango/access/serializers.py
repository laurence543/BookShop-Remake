from rest_framework import serializers
from access.models import User, Order, Order_content


class UserSerializer(serializers.ModelSerializer):
    pass


class OrderSerializer(serializers.ModelSerializer):
    pass


class Order_ContentSerializer(serializers.ModelSerializer):
    pass
