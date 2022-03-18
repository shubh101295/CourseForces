from django.urls import path,include

from .views import (
    user_register,activate,
)

urlpatterns = [
	path('register/',user_register, name="user_register"),
	path('activate/<str:username>/code=<str:code>/' ,activate, name="activate"),
]