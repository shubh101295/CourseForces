import React from 'react';
import Question from '../Question/Question'

class QuestionList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			submitted: false,
			submitted_time: '',
		}
	}


	onSubmit = () =>{
		const today = new Date();
		const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
		this.setState({
			submitted: true,
			submitted_time: time
		})
		// fetch('http://localhost:3000/register', {
	 //      method: 'post',
	 //      headers: {'Content-Type': 'application/json'},
	 //      body: JSON.stringify({
	 //        quiz_: this.state.email,
	 //        password: this.state.password,
	 //        name: this.state.name
	 //      })
	 //    })
	 //    .then(response => response.json())
	 //    .then(user => {
	 //        if (user.id) {
	 //          this.props.loadUser(user)
	 //          this.props.onRouteChange('home');
	 //        }
  //     	})
	}
	render(){

		const allQuestions = props.questions.map((user, i) => {
          return (
            <React.Fragment>
            <Question
              key={i}
              question_type={props.questions[i].question_type}
              content={props.questions[i].content} 
              answer={props.questions[i].answer}
              positive_marks={props.questions[i].positive_marks}
              negative_marks={props.questions[i].negative_marks}
              />
              </React.Fragment>
          );
        });

		return (
			<div>
				{allQuestions}
				<button class="f6 link pointer br1 fr mr4 ph3 pv2 mb2 shadow-4 dib white bg-gray" onClick={this.onSubmit}> Submit </button>
			</div>
		);
	}


}

export default QuestionList;