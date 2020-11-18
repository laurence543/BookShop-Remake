
def get_user(request):
    if 'user' in request.session:
        return request.session['user']
    else:
        return 'Гість'