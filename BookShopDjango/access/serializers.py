from rest_framework import serializers
from access.models import User, Order, Order_content


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = "__all__"


class Order_ContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order_content
        fields = "__all__"
