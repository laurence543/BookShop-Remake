from django.shortcuts import render


# Create your views here.
def entry(request):
    return render(request, 'access/entry.html')


def reg(request):
    return render(request, 'access/reg.html')
