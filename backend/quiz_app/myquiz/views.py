from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

# Create your views here.

from .models import *
from .utils import user_in_course_details
from .serializers import QuizSerializer,QuestionSerializer,OptionSerializer
from myusers.utils import getUser
from django.db.models import Q 

@api_view(["POST"])
def add_quiz(request):
	user = getUser(request)
	# print(user)
	util_data,course = user_in_course_details(user,request.data.get("course_pk",""))
	if util_data["allowed"]:
		if util_data["relation"] == 'P': 
			# if request.method == "POST":
			quiz_data = {}
			quiz_data["title"] = request.data.get("title" ,"")
			quiz_data["content"] = request.data.get("content", "")
			quiz_data["deadline"] = request.data.get("deadline","")
			quiz_data["start_at"] = request.data.get("start_at","")
			serializer = QuizSerializer(data = quiz_data)
			if serializer.is_valid():				
				quizes = Quiz.objects.filter(Q(title=quiz_data["title"])) 
				for temp_quiz in quizes:
					quiz_in_course_relations = quiz_in_course.objects.filter(Q(course=course.id) & Q(quiz=temp_quiz))
					# print("YOYO ",quiz_in_course_relations,len(quiz_in_course_relations))
					if len(quiz_in_course_relations)>0:
						return Response("Quiz with the same title exists in the course", status=status.HTTP_400_BAD_REQUEST)
				quiz_response = serializer.save()
				# print(a)
				new_quiz_in_course_relation = quiz_in_course(course=course,quiz=quiz_response)
				new_quiz_in_course_relation.save()
				return	Response("ok" ,status=status.HTTP_200_OK)
			return Response(serializer.errors , status=status.HTTP_400_BAD_REQUEST) 
		return Response("You are not Prof in the course",status=status.HTTP_401_UNAUTHORIZED)
	return Response(util_data["error_message"], status=util_data["status"])