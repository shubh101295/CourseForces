import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import SignIn from './components/SignIn/SignIn'
import Register from './components/Register/Register'
import Particles from "react-tsparticles";
import CardList from "./components/CardList/CardList";
import {particlesOptions} from './ParticlesProps.js'
import {courses} from './Courses'

const initialState = {
  input: '',
  route: 'signin',
  isSignedIn: false,
  user: {
    name: '',
    email: '',
    department: ''   // Add as required
  }
}
class App extends Component{

  constructor(){
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({user:{
      name: data.name,
      email: data.email,
      department: data.department
    }})
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState)
      return
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  render(){
    return (
        <div className="App">
        <Particles className="particles"
          id="tsparticles"
          options={particlesOptions}
        />
          <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange} />
          <Logo isSignedIn={this.state.isSignedIn} onRouteChange = {this.onRouteChange}/>
          {
            this.state.route==='signin'
            ? <SignIn onRouteChange={this.onRouteChange}/>
            : this.state.route==='home'
            ? <CardList type="courses" courses={courses} />
            : <Register onRouteChange={this.onRouteChange} />
          }
        </div>
      );
  }
}

export default App;
