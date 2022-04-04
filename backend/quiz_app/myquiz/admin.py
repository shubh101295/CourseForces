from django.contrib import admin

# Register your models here.

from .models import (
	Quiz,quiz_in_course,
	Question,question_in_quiz,
	Option,Option_in_question
)

admin.site.register(Quiz)
admin.site.register(quiz_in_course)
admin.site.register(Question)
admin.site.register(question_in_quiz)
admin.site.register(Option)
admin.site.register(Option_in_question)
