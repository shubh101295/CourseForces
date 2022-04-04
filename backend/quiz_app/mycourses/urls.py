from django.urls import path,include

from .views import (
	create_group,send_request,view_my_courses,
)

urlpatterns = [
	path('create/',create_group, name="create_group"),
	path('join/request/send/',send_request, name="send_request"),
	path('my/list/',view_my_courses, name="view_my_courses"),
	
]