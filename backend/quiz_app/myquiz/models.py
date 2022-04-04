from django.db import models

# Create your models here.
from myusers.models import MyUser
from mycourses.models import Course

class Quiz(models.Model):
	title = models.CharField(max_length =200)
	content = models.CharField(max_length=1000)
	deadline = models.DateTimeField(auto_now=False, auto_now_add=False)
	start_at = models.DateTimeField(auto_now=False, auto_now_add=False)
	checked = models.BooleanField(default=False)
	answer_key_visible = models.BooleanField(default=False) # for students of the course

class quiz_in_course(models.Model):
	course = models.ForeignKey(Course , on_delete=models.CASCADE)
	quiz = models.ForeignKey(Quiz , on_delete=models.CASCADE)

class Question(models.Model):
	content = models.CharField(max_length=200 )
	answer = models.CharField(max_length=100, blank=True)	
	question_type_options = [
		("I" , "Integer Type"),
		("S" , "MCQ Single Correct"),
		("M" , "MCQ Multi Correct all options"),
		("F" , "Fill in the blank") 
	]
	question_type = models.CharField(max_length=1,choices = question_type_options)
	positive_marks = models.IntegerField()
	negative_marks= models.FloatField()
	parital_allowed = models.BooleanField(default=False)

class question_in_quiz(models.Model):
	question = models.ForeignKey(Question , on_delete=models.CASCADE)
	quiz = models.ForeignKey(Quiz , on_delete=models.CASCADE)

class Option(models.Model):
	option_value = models.CharField(max_length=100)

class Option_in_question(models.Model):
	question = models.ForeignKey(Question , on_delete=models.CASCADE)
	option = models.ForeignKey(Option , on_delete=models.CASCADE)
