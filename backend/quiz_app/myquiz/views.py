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

@api_view(["GET"])
def quiz_in_a_course_list(request,course_pk):
	user = getUser(request)
	util_data,course = user_in_course_details(user,course_pk)
	if util_data["allowed"]:
		quiz_in_course_relations = quiz_in_course.objects.filter(Q(course=course_pk))
		course_data = {
			"quiz_list" : []
		}
		for i in quiz_in_course_relations:
			_current_quiz_data = {
				"pk":i.quiz.pk,
				"title":i.quiz.title,
				"content":i.quiz.content,
				"deadline":i.quiz.deadline,
				"start_at":i.quiz.start_at,	
			}
			course_data["quiz_list"].append(_current_quiz_data)
		return Response(course_data,status=status.HTTP_200_OK)
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
					question_serializer = QuestionSerializer(data = question_data)
					option_serialisers_results = []
					if question_serializer.is_valid():				
						option_serialisers = []
						correct_answers_index = []
						if question_data["question_type"] == "S" or question_data["question_type"] == "M": 
							question_data["options"] = request.data.get("options",[])
							index = 0
							for _temp_option_data in question_data["options"]:
								print(_temp_option_data)
								if "option_value" not in _temp_option_data.keys() or "is_correct" not in _temp_option_data.keys():
									return Response("Option at index "+str(index)+" has wrong format",status=status.HTTP_400_BAD_REQUEST)
								_current_option_serialiser = OptionSerializer(data={"option_value":_temp_option_data["option_value"]})
								if _current_option_serialiser.is_valid():
									option_serialisers.append(_current_option_serialiser)
								else:
									return Response(_current_option_serialiser.errors , status=status.HTTP_400_BAD_REQUEST)
								if _temp_option_data["is_correct"]==True:
									correct_answers_index.append(index)
								index+=1
							if len(option_serialisers)<1 or len(option_serialisers)>5 or len(correct_answers_index)==0:
								return Response("A question must have total number of options in range 1 to 5 and have atleast one answer correct", status=status.HTTP_400_BAD_REQUEST)
							if 	question_data["question_type"] == "S" and len(correct_answers_index)>1:
								return Response("A single correct type can have exactly one correct answer",status=status.HTTP_400_BAD_REQUEST)
							index = 0
							_answer_pks= []
							for _temp_serializer in option_serialisers:
								_current_option_results = _temp_serializer.save()
								option_serialisers_results.append(_current_option_results)
								# print(index,correct_answers_index,index in correct_answers_index)
								if index in correct_answers_index:
									_answer_pks.append(str(_current_option_results.pk))
								index+=1
							# print(_answer_pks)
							question_data["answer"] = ";".join(_answer_pks)
							question_serializer = QuestionSerializer(data = question_data)
							if question_serializer.is_valid():
								pass
							else:
								return Response(question_serializer.errors , status=status.HTTP_400_BAD_REQUEST)
						question_response = question_serializer.save()
						for _temp_option in option_serialisers_results:
							option_in_question_relation = Option_in_question(question=question_response,option=_temp_option)
							option_in_question_relation.save()
						new_question_in_quiz_relation = question_in_quiz(question=question_response,quiz=quiz_in_course_relations[0].quiz)
						new_question_in_quiz_relation.save()
						return Response({
							"question_pk":question_response.pk
							},status=status.HTTP_200_OK)
					return Response(question_serializer.errors , status=status.HTTP_400_BAD_REQUEST)
				return Response("No such quiz found in the course", status=status.HTTP_400_BAD_REQUEST)
			return Response("quiz_pk should not be empty",status=status.HTTP_400_BAD_REQUEST)
		return Response("You are not Professor in the course",status=status.HTTP_401_UNAUTHORIZED)
	return Response(util_data["error_message"], status=util_data["status"])

@api_view(["DELETE"])
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
							options_in_questions_relations = Option_in_question.objects.filter(Q(question=question_pk))
							for _option in options_in_questions_relations:
								option_relation = Option.objects.filter(Q(pk=_option.option.pk))
								option_relation.delete()
							question_relations.delete()
							return Response("Succesfully deleted the question",status=status.HTTP_200_OK)
						return Response("No such question found in the quiz", status=status.HTTP_400_BAD_REQUEST)
					return Response("question_pk should not be empty",status=status.HTTP_400_BAD_REQUEST)
				return Response("No such quiz found in the course", status=status.HTTP_400_BAD_REQUEST)
			return Response("quiz_pk should not be empty",status=status.HTTP_400_BAD_REQUEST)
		return Response("You are not Professor in the course",status=status.HTTP_401_UNAUTHORIZED)
	return Response(util_data["error_message"], status=util_data["status"])

@api_view(["GET"])
def view_quiz_questions(request,course_pk, quiz_pk):
	user = getUser(request)
	# print(user)
	util_data,course = user_in_course_details(user,course_pk)
	if util_data["allowed"]:
		quiz_in_course_relations = quiz_in_course.objects.filter(Q(course=course) & Q(quiz=quiz_pk)).distinct()
		# print(quiz_in_course_relations)
		if len(quiz_in_course_relations)==1:
			quiz_data = {
				"title":quiz_in_course_relations[0].quiz.title,
				"content":quiz_in_course_relations[0].quiz.content,
				"start_at":quiz_in_course_relations[0].quiz.start_at,
				"deadline":quiz_in_course_relations[0].quiz.deadline,
				"questions":[]
			}
			question_relation = question_in_quiz.objects.filter(Q(quiz=quiz_pk))
			for _ques in question_relation:
				_current_question_data = {
					"question_pk":_ques.question.pk,
					"content":_ques.question.content,
					"question_type":_ques.question.question_type, 
					"positive_marks":_ques.question.positive_marks,
					"negative_marks":_ques.question.negative_marks,
					"partial_allowed":_ques.question.partial_allowed
				}
				if _ques.question.question_type=="M" or _ques.question.question_type=="S":
					_current_question_data["options"] = []
					options_in_questions_relations = Option_in_question.objects.filter(Q(question=_ques.question.pk))
					for _option in options_in_questions_relations:
						_curent_option_data = {
							"option_value":_option.option.option_value,
							"option_pk":_option.option.pk
						}
						_current_question_data["options"].append(_curent_option_data)
				quiz_data["questions"].append(_current_question_data)
			return Response(quiz_data,status=status.HTTP_200_OK)
		return Response("No such quiz found in the course", status=status.HTTP_400_BAD_REQUEST)
	return Response(util_data["error_message"], status=util_data["status"])
