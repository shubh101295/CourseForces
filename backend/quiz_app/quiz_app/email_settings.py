EMAIL_USE_TLS = True
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_HOST_PASSWORD=''
EMAIL_HOST_USER=''
EMAIL_PORT = 587
DEFAULT_FROM_EMAIL = EMAIL_HOST_USER

EMAIL_TITLE={
	"ACTIVATION":"Activate your Course Connect password",
	"FORGOT_PASSWORD":"Change your Course Connect password"
}

EMAIL_BASE_LINK = 'http://127.0.0.1:8000/users/'

EMAIL_CONTENT = {
	"ACTIVATION" : """Hi {name:s},\nActivate your course connect account by clicking on the link below or copy pasting it in the browser\n\n\n\n\n""", 
	"FORGOT_PASSWORD":"""Hi {name:s},\nClick on the link below or copy paste it in the browser to change the password of your account\n\n\n\n\n"""
}