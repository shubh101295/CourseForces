from django.urls import path,include

from .views import (
    add_quiz
)

urlpatterns = [
	path('add/',add_quiz, name="add_quiz"),
]