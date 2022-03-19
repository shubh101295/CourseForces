EMAIL_USE_TLS = True
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_HOST_PASSWORD='dbmscs315'
EMAIL_HOST_USER='cs315legends@gmail.com'
EMAIL_PORT = 587
DEFAULT_FROM_EMAIL = EMAIL_HOST_USER

EMAIL_TITLE={
	"ACTIVATION":"Activate your CourseForces account",
	"FORGOT_PASSWORD":"Change your CourseForces password",
	"COURSE_JOIN_REQUEST":"""Invitation to join {course_code:s}""",
}

EMAIL_BASE_LINK = 'http://127.0.0.1:8000/users/'
EMAIL_BASE_LINK_COURSE_JOINING = 'http://127.0.0.1:8000/courses/join/'
EMAIL_CONTENT = {
	"ACTIVATION" : """Hi {name:s},\nActivate your CourseForces account by clicking on the link below or copy pasting it in the browser\n\n\n\n\n""", 
	"FORGOT_PASSWORD":"""Hi {name:s},\nClick on the link below or copy paste it in the browser to change the password of your account\n\n\n\n\n""",
	"COURSE_JOIN_REQUEST":"""Hi {name1:s},\nYou have invited by {name2:s} to join the course {course_name:s} as a {role:s}.Click on the link below or copy paste it in the browser to join the course\n\n\n\n\n""",
}