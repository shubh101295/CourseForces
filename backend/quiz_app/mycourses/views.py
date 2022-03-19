from django.shortcuts import render,get_object_or_404
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from django.core.mail import send_mail
from quiz_app.email_settings import *
from django.db.models import Q 


from .models import Course,user_in_course
from .serializers import CourseSerializer
from myusers.utils import getUser,getUserData


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
