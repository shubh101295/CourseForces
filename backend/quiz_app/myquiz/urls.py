from django.urls import path,include

from .views import (
    add_quiz,add_question,delete_question,view_quiz_questions,
    quiz_in_a_course_list,make_a_quiz_submission,

)

urlpatterns = [
	path('add/',add_quiz, name="add_quiz"),
	path('question/add/',add_question, name="add_question"),
	path('question/delete/',delete_question, name="delete_question"),
	path('view/<int:course_pk>/<int:quiz_pk>/',view_quiz_questions, name="view_quiz_questions"),
	path('view/<int:course_pk>/',quiz_in_a_course_list, name="quiz_in_a_course_list"),
	path('make/submission/',make_a_quiz_submission, name="make_a_quiz_submission"),

]