from rest_framework import serializers
from access.models import User, Order, Order_content
from dj_rest_auth.models import TokenModel
try:
    from django.utils.translation import ugettext_lazy as _
except ImportError:
    from django.utils.translation import gettext_lazy as _
from allauth.account import app_settings as allauth_settings
from allauth.account.adapter import get_adapter
from allauth.account.utils import setup_user_email
from allauth.utils import email_address_exists, get_username_max_length


class RegisterSerializer(serializers.Serializer):
    username = serializers.CharField(
        max_length=get_username_max_length(),
        min_length=allauth_settings.USERNAME_MIN_LENGTH,
        required=allauth_settings.USERNAME_REQUIRED
    )
    email = serializers.EmailField(required=allauth_settings.EMAIL_REQUIRED)
    password1 = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)

    # Additional info
    gender = serializers.CharField()
    first_name = serializers.CharField()
    last_name = serializers.CharField(required=False)
    birth_date = serializers.DateField(required=False)
    location = serializers.CharField()
    tel = serializers.IntegerField()

    def validate_username(self, username):
        username = get_adapter().clean_username(username)
        return username

    def validate_email(self, email):
        email = get_adapter().clean_email(email)
        if allauth_settings.UNIQUE_EMAIL:
            if email and email_address_exists(email):
                raise serializers.ValidationError(
                    _("A user is already registered with this e-mail address."))
        return email

    def validate_password1(self, password):
        return get_adapter().clean_password(password)

    def validate(self, data):
        if data['password1'] != data['password2']:
            raise serializers.ValidationError(_("The two password fields do not match."))
        return data

    def custom_signup(self, request, user):
        pass

    def get_cleaned_data(self):
        return {
            'username': self.validated_data.get('username', ''),
            'password1': self.validated_data.get('password1', ''),
            'email': self.validated_data.get('email', ''),


            'gender': self.validated_data.get('gender', ''),
            'first_name': self.validated_data.get('first_name', ''),
            'last_name': self.validated_data.get('last_name', ''),
            'birth_date': self.validated_data.get('birth_date', ''),
            'location': self.validated_data.get('location', ''),
            'tel': self.validated_data.get('tel', ''),
        }

    def save(self, request):
        adapter = get_adapter()
        user = adapter.new_user(request)
        self.cleaned_data = self.get_cleaned_data()
        adapter.save_user(request, user, self)
        self.custom_signup(request, user)
        setup_user_email(request, user, [])

        # user.gender = self.cleaned_data.get('gender')
        # user.birth_date = self.cleaned_data.get('birth_date')

        return user


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"


class OrderContentSerializer(serializers.ModelSerializer):
    """
        For order creation.
    """

    class Meta:
        model = Order_content
        fields = (
            'book',
            'amount',
        )


class OrderProfileSerializer(serializers.ModelSerializer):
    """
        Orders representation for Profile.
    """
    user = serializers.CharField(source="user.username")

    class Meta:
        model = Order
        fields = ('id',
                  'user',
                  'order_date',
                  )


class OrderSerializer(serializers.ModelSerializer):
    """
        Order serializer for orders creation.
    """
    books_data = OrderContentSerializer(many=True)

    class Meta:
        model = Order
        fields = (
                  'books_data',
                  )

    def create(self, validated_data):
        books_data = validated_data['books_data']
        user_id = self.context['request'].user.id
        chosen_user = User.objects.get(id=user_id)
        order = Order.objects.create(user=chosen_user)
        for book in books_data:
            Order_content.objects.create(order=order, **book)
        return validated_data


class CheckoutSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'first_name',
            'tel',
            'location',
        )


class TokenSerializer(serializers.ModelSerializer):
    """
    Serializer for Token model.
    """
    is_user_staff = serializers.CharField(source="user.is_staff")

    class Meta:
        model = TokenModel
        fields = ('key', 'is_user_staff')
