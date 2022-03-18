import random
import string
import hashlib
import bcrypt

from django.http import HttpResponse
from django.shortcuts import render,get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from quiz_app.email_settings import *
from django.core.mail import send_mail

from .serializers import (
	RegisterSerializer
)

from .models import (
    MyUser
)

def HashPass(password):
    password=password.encode()
    return bcrypt.hashpw(password,bcrypt.gensalt())

def pass_checker(old,password):
    return bcrypt.checkpw(old.encode(),password)

@api_view(["POST"])
def user_register(request):
	register_data ={}
	register_data["name"] = request.data.get("name","")
	register_data["username"] = request.data.get("username","")
	register_data["department"] = request.data.get("department","")
	register_data["email"] = request.data.get("email","")
	other_user = MyUser.objects.filter(email = register_data["email"],verified=True)
	if len(other_user)>=1:
		return Response("User with that emailID is registered" ,status = status.HTTP_401_UNAUTHORIZED)
	password1 = request.data.get("password","")
	password2 = request.data.get("confirm_password","")
	if password2 == password1:
		if len(password2)>=4:
			code = ''.join(random.choices(string.ascii_uppercase + string.ascii_lowercase + string.digits, k = 20)) 
			register_data["verification_code"] = hashlib.sha256(code.encode()).hexdigest()
			register_data["password"]=HashPass(password1).decode()
			serializer = RegisterSerializer(data = register_data)
			if serializer.is_valid():
				serializer.save()         
				# print("Email Sent")
				content = EMAIL_CONTENT["ACTIVATION"].format(name=register_data["username"]) +EMAIL_BASE_LINK +"/activate/"+ register_data["username"] +"/code=" + code +"/" 
				send_mail(EMAIL_TITLE["ACTIVATION"] , content , DEFAULT_FROM_EMAIL , [register_data["email"]])
				return Response("ok" , status = status.HTTP_200_OK)
			return Response(serializer.errors , status = status.HTTP_400_BAD_REQUEST)
		return Response("Password must be atleast 4 characters",status=status.HTTP_400_BAD_REQUEST)
	return Response("Password must be same", status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
def activate(request , username, code):
	user= get_object_or_404(MyUser, username=username)
	hashed_code = hashlib.sha256(code.encode()).hexdigest()
	if user.verified == True:
		return HttpResponse("Invalid Request") 
		# Response("Invalid Request",status = status.HTTP_401_UNAUTHORIZED) 
	else: #if user.verified == False
		if user.verification_code==hashed_code:
			user.verified= True
			user.verification_code = ''
			user.save()
			return HttpResponse("Activated Your Account")
		return HttpResponse("Invalid Request") 
	