from django import forms


class CreateForm(forms.Form):
    title = forms.CharField(label='Заголовок', widget=forms.TextInput(attrs={'class': 'input'}))
    author = forms.CharField(label='Автор', widget=forms.TextInput(attrs={'class': 'input'}))
    description = forms.CharField(label='Опис', widget=forms.Textarea(attrs={'class': 'input'}))
    publish_year = forms.CharField(label='Рік видання', widget=forms.NumberInput(attrs={'class': 'input'}))
    publisher = forms.CharField(label='Видавництво', widget=forms.TextInput(attrs={'class': 'input'}))
    stock = forms.CharField(label='Кількість на складі', widget=forms.NumberInput(attrs={'class': 'input'}))
    price = forms.CharField(label='Ціна', widget=forms.NumberInput(attrs={'class': 'input'}))
    language = forms.CharField(label='Мова', widget=forms.TextInput(attrs={'class': 'input'}))
    image = forms.FileField(label='Картинка', widget=forms.FileInput(attrs={'class': 'file'}))


class EditForm(forms.Form):
    title = forms.CharField(label='Заголовок', widget=forms.TextInput(attrs={'class': 'input'}))
    author = forms.CharField(label='Автор', widget=forms.TextInput(attrs={'class': 'input'}))
    description = forms.CharField(label='Опис', widget=forms.Textarea(attrs={'class': 'input'}))
    publish_year = forms.CharField(label='Рік видання', widget=forms.NumberInput(attrs={'class': 'input'}))
    publisher = forms.CharField(label='Видавництво', widget=forms.TextInput(attrs={'class': 'input'}))
    stock = forms.CharField(label='Кількість на складі', widget=forms.NumberInput(attrs={'class': 'input'}))
    price = forms.CharField(label='Ціна', widget=forms.NumberInput(attrs={'class': 'input'}))
    language = forms.CharField(label='Мова', widget=forms.TextInput(attrs={'class': 'input'}))


class EditImageForm(forms.Form):
    image = forms.FileField(label='Картинка', widget=forms.FileInput(attrs={'class': 'file'}))
