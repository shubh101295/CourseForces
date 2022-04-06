from django.urls import path,include

from .views import (
    add_quiz,add_question,delete_question
)

urlpatterns = [
	path('add/',add_quiz, name="add_quiz"),
	path('question/add/',add_question, name="add_question"),
	path('question/delete/',delete_question, name="delete_question"),
	# path('question/add/',add_question, name="add_question"),

]