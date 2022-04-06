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
					quiz_in_course_relations = quiz_in_course.objects.filter(Q(course=course.id) & Q(quiz=temp_quiz)).distinct()
					# print("YOYO ",quiz_in_course_relations,len(quiz_in_course_relations))
					if len(quiz_in_course_relations)>0:
						return Response("Quiz with the same title exists in the course", status=status.HTTP_400_BAD_REQUEST)
				quiz_response = serializer.save()
				# print(a)
				new_quiz_in_course_relation = quiz_in_course(course=course,quiz=quiz_response)
				new_quiz_in_course_relation.save()
				return	Response({
					"quiz_pk":quiz_response.pk 
					} ,status=status.HTTP_200_OK)
			return Response(serializer.errors , status=status.HTTP_400_BAD_REQUEST) 
		return Response("You are not Professor in the course",status=status.HTTP_401_UNAUTHORIZED)
	return Response(util_data["error_message"], status=util_data["status"])

@api_view(["POST"])
def add_question(request):
	user = getUser(request)
	# print(user)
	util_data,course = user_in_course_details(user,request.data.get("course_pk",""))
	if util_data["allowed"]:
		if util_data["relation"] == 'P': 
			quiz_pk = request.data.get("quiz_pk", "")
			if quiz_pk!="":
				quiz_in_course_relations = quiz_in_course.objects.filter(Q(course=course) & Q(quiz=quiz_pk)).distinct()
				if len(quiz_in_course_relations)==1:
					question_data = {}
					question_data["content"] = request.data.get("content" ,"")
					question_data["answer"] = request.data.get("answer","")
					question_data["positive_marks"] = request.data.get("positive_marks","")
					question_data["negative_marks"] = request.data.get("negative_marks","")
					question_data["question_type"] = request.data.get("question_type","")
					question_data["partial_allowed"] = request.data.get("partial_allowed","")
					serializer = QuestionSerializer(data = question_data)
					if serializer.is_valid():				
						question_response = serializer.save()
						new_question_in_quiz_relation = question_in_quiz(question=question_response,quiz=quiz_in_course_relations[0].quiz).distinct()
						new_question_in_quiz_relation.save()
						return Response({
							"question_pk":question_response.pk
							},status=status.HTTP_200_OK)
					return Response(serializer.errors , status=status.HTTP_400_BAD_REQUEST)
				return Response("No such quiz found in the course", status=status.HTTP_400_BAD_REQUEST)
			return Response("quiz_pk should not be empty",status=status.HTTP_400_BAD_REQUEST)
		return Response("You are not Professor in the course",status=status.HTTP_401_UNAUTHORIZED)
	return Response(util_data["error_message"], status=util_data["status"])

@api_view(["POST"])
def delete_question(request):
	user = getUser(request)
	util_data,course = user_in_course_details(user,request.data.get("course_pk",""))
	if util_data["allowed"]:
		if util_data["relation"] == 'P': 
			quiz_pk = request.data.get("quiz_pk", "")
			if quiz_pk!="":
				quiz_in_course_relations = quiz_in_course.objects.filter(Q(course=course) & Q(quiz=quiz_pk))
				if len(quiz_in_course_relations)==1:
					question_pk = request.data.get("question_pk", "")
					if question_pk!="":
						question_in_quiz_relations = question_in_quiz.objects.filter(Q(question=question_pk) & Q(quiz=quiz_pk))
						if len(question_in_quiz_relations)==1:
							question_relations = Question.objects.filter(Q(pk=question_pk))
							question_relations.delete()
							return Response("Succesfully deleted the question",status=status.HTTP_200_OK)
						return Response("No such question found in the quiz", status=status.HTTP_400_BAD_REQUEST)
					return Response("question_pk should not be empty",status=status.HTTP_400_BAD_REQUEST)
				return Response("No such quiz found in the course", status=status.HTTP_400_BAD_REQUEST)
			return Response("quiz_pk should not be empty",status=status.HTTP_400_BAD_REQUEST)
		return Response("You are not Professor in the course",status=status.HTTP_401_UNAUTHORIZED)
	return Response(util_data["error_message"], status=util_data["status"])
