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

### Course

1)
```
Route - /courses/create/
Task - It creates a new course
METHOD - POST
Headers should contain "Authorization" field which stores the token
Input format = {
	"course_code":<string>,
	"course_name":<string>,
	"offered_year":<string>
}

Refetch the whole the courses here to get the update list 

```

2)
```
Route - /courses/join/request/send/
Task - It sends a join course request to the person
METHOD - POST
Headers should contain "Authorization" field which stores the token
Input format = {
	"course_pk":<int>,
	"send_to_user":<string username of the >,
	"offered_year":<string>
}

```

Acceptance is done by the email sent to the send_to_user

3) 

```
Route - /courses/my/list/
Task - It shows the list of user courses
Headers should contain "Authorization" field which stores the token
METHOD - GET

Output Format = 
[
    {
        "id": 18,
        "user_id": 14,
        "course_id": 3,
        "role": "P",
        "request_accepted": true,
        "verification_code": null 
    },
    {
        "id": 19,
        "user_id": 14,
        "course_id": 4,
        "role": "S",
        "request_accepted": true,
        "verification_code": null
    },
    
]
```

Here ignore the "verification_code" field

4) 
```
Route - /courses/list/<int:course_pk>/
Task - It shows the list of user in a particular course
Headers should contain "Authorization" field which stores the token
METHOD - GET

Output format
[
    {
        "id": 2,
        "user_id": 15,
        "course_id": 3,
        "role": "S",
        "request_accepted": true,
        "verification_code": null
    },
    {
        "id": 18,
        "user_id": 14,
        "course_id": 3,
        "role": "P",
        "request_accepted": true,
        "verification_code": null
    }
]
```
