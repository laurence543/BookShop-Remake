from django import forms


class RegForm(forms.Form):
    login = forms.CharField(label='Логін:')
    pass1 = forms.CharField(widget=forms.PasswordInput(),
                            label='Пароль:')
    pass2 = forms.CharField(widget=forms.PasswordInput(),
                            label='Повторіть пароль:')
    email = forms.EmailField(label='E-Mail:')


class EntryForm(forms.Form):
    login = forms.CharField(label='Логін:')
    pass1 = forms.CharField(widget=forms.PasswordInput(),
                            label='Пароль:')
