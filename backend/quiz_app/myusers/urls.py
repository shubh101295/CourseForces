from django.urls import path,include

from .views import (
    user_register,activate,user_login,user_logout,
)

urlpatterns = [
	path('register/',user_register, name="user_register"),
	path('activate/<str:username>/code=<str:code>/' ,activate, name="activate"),
	path('auth/login/',user_login, name="user_login"),
	path('auth/logout/',user_logout, name="user_logout"),

]