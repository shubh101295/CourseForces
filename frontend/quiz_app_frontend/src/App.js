import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import SignIn from './components/SignIn/SignIn'
import Register from './components/Register/Register'
import Particles from "react-tsparticles";
import CardList from "./components/CardList/CardList";
import QuizList from "./components/QuizList/QuizList";
import QuestionList from "./components/QuestionList/QuestionList";
import StudentList from "./components/StudentList/StudentList";
import InviteForm from "./components/InviteForm/InviteForm";
import CreateQuiz from "./components/CreateQuiz/CreateQuiz";
import CreateCourse from "./components/CreateCourse/CreateCourse";
import CreateQuestions from "./components/CreateQuestions/CreateQuestions";
import QuizInfoPage from "./components/QuizInfoPage/QuizInfoPage";
import {particlesOptions} from './ParticlesProps.js'
// import {courses} from './Courses'
// import {quizzes} from './quizzes'
// import {students} from './students'
import {questions} from './questions'

const initialState = {
  route: 'signin',
  isSignedIn: false,
  user: {
    token: '',
    name: '',
    username: '',
    email: '',
    department: '',
  },
  course_page: {
    role: '' , 
    idx: -1, 
    displayed_course: ''
  },
  quiz_page: {
    displayed_quiz: 0,
    pk : -1,
    num : 0,
  },
  invite_page: {
    input: ''
  },
  courses: [],
  roles: [],
  quizzes: [],
  students: []
}

class App extends Component{

  constructor(){
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    alert("Entered loadUser",data)
    this.setState({user:{
      token: data.token,
      name: data.name,
      username: data.username,
      email: data.email,
      department: data.department,
    }})

    fetch('http://127.0.0.1:8000/courses/my/list/', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.state.user.token
      },
    })
      .then(response => {
        if(response.status === 200){
          alert("Course List Fetched!")
          return response.json()
        }
        else{
          throw new Error(response.status)
        }
      })
      .then(data => {
        let temp = []
        let roles = []
        for (var i = 0; i < data.length; i++) {
          temp.push(data[i].course)
          roles.push(data[i].role)
        }
        this.setState({
          courses:temp, 
          roles: roles
        });
      })
      .catch(error => {
        alert("Something's wrong, an error occured :(")
        alert(error)
      })

  }

  onInputChange = (event) => {
    this.setState({
      invite_page:{
        input: event.target.value
      }
    });
  }

  setQuiz = (pk,num) => {
    var len = this.state.quizzes.length
    this.setState({
      quiz_page:{
        displayed_quiz: len,
        pk: pk,
        num: num,
      } 
    });
  }
  onRouteChange = (route) => {
    if (route === 'signout') {
      fetch('http://127.0.0.1:8000/users/auth/logout/', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.state.user.token
      },
    })
      .then(response => {
        alert(response.status);
      })
      this.setState(initialState)
      return
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }


  onCourseSelect = (idx) =>{
    this.setState({
      course_page:{
        role: this.state.roles[idx],
        idx: idx,
        displayed_course:this.state.courses[idx].course_code
      },
      route:'CoursePage'
    })

    fetch(`http://127.0.0.1:8000/quiz/view/${this.state.courses[idx].id}/`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.state.user.token
      },
    })
      .then(response => {
        if(response.status === 200){
          alert("Quiz List Fetched!")
          return response.json()
        }
        else{
          throw new Error(response.status)
        }
      })
      .then(data => {
        let quizzes = []
        for (var i = 0; i < data.quiz_list.length; i++) {
          quizzes.push(data.quiz_list[i])
        }
        this.setState({
          quizzes : quizzes
        });
      })
      .catch(error => {
        alert("Something's wrong, an error occured :(")
        alert(error)
      })

  }

  sendInvite = () =>{
    let r = prompt(`Enter the role (S/P) you wish to invite ${this.state.invite_page.input} as:\n S: Student \n P: Professor`)
    // send to backend, and set route depending on received status
    fetch(`http://127.0.0.1:8000/courses/join/request/send/`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.state.user.token
      },
      body: JSON.stringify({
        course_pk: this.state.courses[this.state.course_page.idx].id,
        send_to_user: this.state.invite_page.input,
        join_as_role: r
      })
    })
      .then(response => {return response.json()})
      .then(response => {
        if(response.message === "User has been invited to the course"){
          alert(response.message + "!")
          this.loadStudents();
        }
        else{
          throw new Error(response.message)
        }
      })
      .catch(error => {
        alert("Something's wrong, an error occured :(")
        alert(error)
      })
  }

  loadStudents = () => {
    // Load from backend, update state, route to StudentList
      fetch(`http://127.0.0.1:8000/courses/list/${this.state.courses[this.state.course_page.idx].id}/`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.state.user.token
      },
    })
      .then(response => {
        if(response.status === 200){
          alert("Student List Fetched!")
          return response.json()
        }
        else{
          throw new Error(response.status)
        }
      })
    .then(data => {
      let temp = []
      for (var i = 0; i < data.length; i++) {
        temp.push(data[i])
      }
      this.setState({
        students:temp, 
      });
    })
    this.onRouteChange("StudentList")
  }

  loadQuizzes = () => {
    fetch(`http://127.0.0.1:8000/quiz/view/${this.state.courses[this.state.course_page.idx].id}/`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.state.user.token
      },
    })
      .then(response => {
        if(response.status === 200){
          alert("Quiz List Fetched!")
          return response.json()
        }
        else{
          throw new Error(response.status)
        }
      })
      .then(data => {
        let quizzes = []
        for (var i = 0; i < data.quiz_list.length; i++) {
          quizzes.push(data.quiz_list[i])
        }
        this.setState({
          quizzes : quizzes
        });
      })
      .catch(error => {
        alert("Something's wrong, an error occured :(")
        alert(error)
      })

      this.onRouteChange('CoursePage')
  }

  onAnswerChange = (key) => {

  }
  render(){
    return (
        <div className="App">
        <Particles className="particles"
          id="tsparticles"
          options={particlesOptions}
        />
          <Navigation name={this.state.user.username} isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange} />
          <Logo isSignedIn={this.state.isSignedIn} onRouteChange = {this.onRouteChange}/>
          {
            this.state.route==='signin'
            ? <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
            : this.state.route==='home' 
            ? <CardList onCourseSelect={this.onCourseSelect} courses = {this.state.courses} onRouteChange={this.onRouteChange} />
            : this.state.route==='register'
            ? <Register onRouteChange={this.onRouteChange} />
            : this.state.route==='CoursePage'
            ? <QuizList loadStudents = {this.loadStudents} onRouteChange={this.onRouteChange} course_code={this.state.course_page.displayed_course} role={this.state.course_page.role} quizzes = {this.state.quizzes} />
            : this.state.route==='StudentList'
            ? <StudentList course_code={this.state.course_page.displayed_course} onRouteChange={this.onRouteChange} students={this.state.students}/>
            : this.state.route==='InviteForm'
            ? <InviteForm sendInvite = {this.sendInvite} onInputChange={this.onInputChange} course_code={this.state.course_page.displayed_course} onRouteChange={this.onRouteChange} />
            : this.state.route==='CreateQuiz'
            ? <CreateQuiz setQuiz={this.setQuiz} token = {this.state.user.token} course_pk = {this.state.courses[this.state.course_page.idx].id} onRouteChange={this.onRouteChange} />
            : this.state.route==='CreateQuestions'
            ? <CreateQuestions loadQuizzes={this.loadQuizzes} quiz_pk = {this.state.quiz_page.pk}  course_pk = {this.state.courses[this.state.course_page.idx].id} token = {this.state.user.token} onRouteChange={this.onRouteChange} num={this.state.quiz_page.num} />
            : this.state.route==='QuizInfoPage'
            ? <QuizInfoPage quiz={this.state.quizzes[this.state.quiz_page.displayed_quiz]} onRouteChange={this.onRouteChange} />
            : this.state.route === 'QuestionList'
            ? <QuestionList quiz={this.state.quizzes[this.state.quiz_page.displayed_quiz]} questions={questions} onRouteChange={this.onRouteChange} />
            : this.state.route==='CreateCourse'
            ? <CreateCourse onRouteChange={this.onRouteChange} data={this.state.user} loadUser = {this.loadUser} />
            : <p> Component not yet created! </p>
          }
        </div>
      );
  }
}

export default App;
