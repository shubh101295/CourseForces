import React from 'react';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      username: '',
      department: '',
      email: '',
      password: '',
      confirm_password: ''
    }
  }

  onNameChange = (event) => {
    this.setState({name: event.target.value})
  }

  onUserNameChange = (event) => {
    this.setState({username: event.target.value})
  }

  onEmailChange = (event) => {
    this.setState({email: event.target.value})
  }

  onPasswordChange = (event) => {
    this.setState({password: event.target.value})
  }

  onDeptChange = (event) => {
    this.setState({department: event.target.value})
  }

  onCnfPasswordChange = (event) => {
    this.setState({confirm_password: event.target.value})
  }

  
  onSubmitSignIn = () => {
    fetch('http://127.0.0.1:8000/users/register/', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: this.state.name,
        username: this.state.username,
        department: this.state.department,
        email: this.state.email,
        password: this.state.password,
        confirm_password: this.state.confirm_password
      })
    })
      .then(response => {
        if(response.status === 200){
          alert("User Registered Successfully!")
          this.props.onRouteChange('signin')
          return response.json()
        }
        else{
          throw new Error(response.status)
        }
      })
      .catch(error => {
        alert("Something's wrong, an error occured :(")
        console.log(error);
      })
  }

  render() {
    const {onRouteChange} = this.props
    return (
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Register</legend>
              <div className="mt2">
                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="text"
                  name="name"
                  id="name"
                  onChange={this.onNameChange}
                />
              </div>
              <div className="mt2">
                <label className="db fw6 lh-copy f6" htmlFor="name">Username</label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="text"
                  name="name"
                  id="name"
                  onChange={this.onUserNameChange}
                />
              </div>
              <div className="mt2">
                <label className="db fw6 lh-copy f6" htmlFor="name">Department</label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="text"
                  name="name"
                  id="name"
                  onChange={this.onDeptChange}
                />
              </div>
              <div className="mt2">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange={this.onEmailChange}
                />
              </div>
              <div className="mt2">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                  onChange={this.onPasswordChange}
                />
              </div>
              <div className="mt2">
                <label className="db fw6 lh-copy f6" htmlFor="password">Confirm Password</label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                  onChange={this.onCnfPasswordChange}
                />
              </div>
            </fieldset>
            
            <div className="mt4">
              <input
                onClick={this.onSubmitSignIn}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Register"
              />
            </div>
            <div className="lh-copy mt2">
              <p  onClick={() => onRouteChange('signin')} className="f6 link dim black db pointer">Already an user? Sign In</p>
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default Register;