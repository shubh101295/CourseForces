from django.db import models

# Create your models here.
class MyUser(models.Model):
    name = models.CharField(max_length = 50)
    username = models.CharField(max_length = 50 , unique = True)
    email = models.EmailField(max_length=254,unique=True)
    # roll_number = models.IntegerField(unique= True)
    department_options = [
		('CSE', 'Computer Science and Engineering'),
		('MSE', 'Material Science and Engineering'),
		('AE', 'Aerospace Engineering'),
		('ME', 'Mechanical Engineering'),
		('EE', 'Electrical Engineering')
	]
    department = models.CharField(max_length=3,
						choices=department_options)
    password = models.CharField(max_length=70)
    verified = models.BooleanField(default = False)
    verification_code = models.CharField(max_length = 66,null=True ,blank=True)
