from django.urls import path
from .views import *

urlpatterns = [
    path('', lobby, name='lobby'),
    path('room/', room),
    path('login/', loginPage, name='login'),
    path('signup/', signup, name='signup'),
    path('logout/', logoutUser, name='logout'),
    path('get_token/', getToken),
    

]
