from django.shortcuts import render, redirect
from agora_token_builder import RtcTokenBuilder
from django.http import JsonResponse
import random
import time
import json
from django.views.decorators.csrf import csrf_exempt
from .models import *
from django.contrib.auth.forms import UserCreationForm
from .forms import CreateUserForm
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required

# Create your views here.
def getToken(request):
    appId = '8dff0cda2d764fc2a8cdd6523f60b103'
    appCertificate = '073e7e6a789246e681619e9ee257ef0b'
    channelName = request.GET.get('channel')
    uid =  random.randint(1,230)
    expirationTimeInSeconds = 3600 * 24
    currentTimeStamp = time.time()
    privilegeExpiredTs = currentTimeStamp + expirationTimeInSeconds
    role = 1

    token = RtcTokenBuilder.buildTokenWithUid(appId, appCertificate, channelName, uid, role, privilegeExpiredTs)
    return JsonResponse({'token': token, 'uid': uid}, safe=False)

def lobby(request):
    return render(request, 'base/lobby.html')

def room(request):
    return render(request, 'base/room.html')


def loginPage(request):
    if request.user.is_authenticated:
        return redirect('/')
    

    form = CreateUserForm()

    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            return redirect('lobby')
        else:
            messages.info(request, 'Username or password is incorrect')
            

    context = {'form': form}
    return render(request, 'base/login.html', context)

def signup(request):

    if request.user.is_authenticated:
        return redirect('/')

    form = CreateUserForm()

    if request.method == 'POST':
        form = CreateUserForm(request.POST)
        if form.is_valid():
            form.save()

            username = form.cleaned_data.get('username')
            messages.success(request, "Account successfully created for " + username )
            return redirect('login')

    context = {'form': form}
    return render(request, 'base/signup.html', context)

def logoutUser(request):
    logout(request)
    return redirect('/')