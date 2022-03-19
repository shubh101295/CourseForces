from django.shortcuts import render,get_object_or_404
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from django.core.mail import send_mail
from quiz_app.email_settings import *
from django.db.models import Q 
import random
import string


from .models import Course,user_in_course
from .serializers import CourseSerializer
from myusers.utils import getUser,getUserData,hashSHA256


@api_view(["POST"])
def create_group(request):
	user = getUser(request)
	if user is not None:
		if user.verified == True:
			group_data ={}
			group_data["course_code"] = request.data.get("course_code", "").rstrip()
			group_data["course_name"] = request.data.get("course_name", "").rstrip()
			group_data["offered_year"] = request.data.get("offered_year", "").rstrip()
			# rstrip() to removes whitespaces at the ed of the string
			serializer = CourseSerializer(data=group_data)
			if serializer.is_valid():
				courses =  Course.objects.filter(Q(course_code= group_data["course_code"]) 
												& Q(offered_year= group_data["offered_year"])).distinct()
				
				if len(courses) ==0:
					course = serializer.save()
					relation = user_in_course(user=user ,course =course, role="P",request_accepted=True)
					relation.save()
					return Response("ok" ,status= status.HTTP_200_OK)
				return Response("Group with such details exists" , status=status.HTTP_400_BAD_REQUEST)
			return Response(serializer.errors , status=status.HTTP_400_BAD_REQUEST)
		return Response("First Activate your account", status=status.HTTP_400_BAD_REQUEST)
	return Response("No user is logged in ", status=status.HTTP_401_UNAUTHORIZED)

@api_view(["POST"])
def send_request(request):
	user = getUser(request)
	if user is not None:
		if user.verified == True:
			course_pk = request.data.get("course_pk", "")
			course = Course.objects.filter(Q(pk= course_pk))
			if len(course) ==1:
				course = course[0]
				relation = user_in_course.objects.filter(Q(user=user) & Q(course=course))
				if len(relation)==1 :
					relation = relation[0]
					if relation.role=='P' :
						send_to_user = request.data.get("send_to_user","")
						my_user = getUserData(send_to_user)
						if my_user is not None:
							relation = user_in_course.objects.filter(Q(user=my_user) & Q(course=course)).distinct()
							if len(relation) ==0:
								if request.data.get("join_as_role","")=="S" or request.data.get("join_as_role","")=="P":
									code = ''.join(random.choices(string.ascii_uppercase + string.ascii_lowercase + string.digits, k = 20)) 
									newuser_in_course = user_in_course(user=my_user,course=course,role=request.data.get("join_as_role",""),verification_code=hashSHA256(code))
									newuser_in_course.save()
									content = EMAIL_CONTENT["COURSE_JOIN_REQUEST"].format(name1=my_user.username,name2=user.username,course_name=course.course_name,role=request.data.get("join_as_role","")) \
													+EMAIL_BASE_LINK_COURSE_JOINING + user.username +"/"+str(course.pk)+"/code=" + code +"/" 
									send_mail(EMAIL_TITLE["COURSE_JOIN_REQUEST"].format(course_code=course.course_code) , content , DEFAULT_FROM_EMAIL , [my_user.email])
									return Response("User has been invited to the course",status=status.HTTP_200_OK)
								return Response("Invalid role.Not allowed",status= status.HTTP_400_BAD_REQUEST)
							return Response("Already sent the join request to the user" ,status= status.HTTP_400_BAD_REQUEST)	
						return Response("No such user exists to send the request to" ,status= status.HTTP_400_BAD_REQUEST)
					return Response("User is not Professor , does not have join request sending access" , status=status.HTTP_401_UNAUTHORIZED)
				return Response("User is not in the group , does not have join request sending access" , status=status.HTTP_401_UNAUTHORIZED)
			return Response("No such course exists" ,status= status.HTTP_400_BAD_REQUEST)
		return Response("First Activate your account", status=status.HTTP_400_BAD_REQUEST)
	return Response("No user is logged in ", status=status.HTTP_401_UNAUTHORIZED)
