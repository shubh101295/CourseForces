```
virtualenv cs315_virtualenv
source cs315_virtualenv/bin/activate
```

## API documentation

```
Output format = will receive a status 200 when succesfull else some status for error with error message
```

### Users

1) 
```
Route - /users/register/
Task - It registers a new user onto the website
METHOD - POST
Input format = {
	"name":<string>,
	"username":<string>,
	"department":one of the following "CSE","MSE","AE","ME","EE",
	"email":<email>,
	"password":<string>,
	"confirm_password":<string>
}
```

2) 
```
Route - /users/auth/login/
Task - It logins a user onto the website
METHOD - POST
Input format = {
	"value":<string(for username)/email(for email)>,
	"password":<string>
}

In output format will receive a token if succesfull
```

3) 
```
Route - /users/auth/logout/
Task - It logout a user from the website
METHOD - POST
Headers should contain "Authorization" field which stores the token
Input format = {}

Remove the token stored and then make it empty
```


4) 
```
Route - /users/password/forgot/1/
Task - It sends a mail to the user to reset the password
METHOD - POST
Input format = {
	"value":<string(for username)/email(for email)>
}

```

5) 
```
Route - /users/password/forgot/1/
Task - It sends a mail to the user to reset the password
METHOD - POST
Input format = {
	"value":<string(for username)/email(for email)>
}

```

6) need to discuss this , can be left for now . First lets integrate the rest.
```
Route - /users/password/forgot/2/<str:username>/code=<str:code>/
Method = POST
Input Format = {
	"new_password1":<a string>,
	"new_password2":<a string>
}

```



