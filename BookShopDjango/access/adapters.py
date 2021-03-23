from allauth.account.adapter import DefaultAccountAdapter
from allauth.account.utils import user_field


class CustomUserAccountAdapter(DefaultAccountAdapter):

    def save_user(self, request, user, form, commit=True):
        """
        Saves a new `User` instance using information provided in the
        signup form.
        """

        user = super().save_user(request, user, form, False)
        user_field(user, 'gender', request.data.get('gender', ''))
        # user_field(user, 'first_name', request.data.get('first_name', ''))
        # user_field(user, 'last_name', request.data.get('last_name', ''))
        user_field(user, 'birth_date', request.data.get('birth_date', ''))
        user_field(user, 'location', request.data.get('location', ''))
        user_field(user, 'tel', request.data.get('tel', ''))
        user.save()
        return user
