import React from 'react';
import Question from '../Question/Question'

class QuestionList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			submitted: false,
			submitted_time: '',
			answers : new Array(this.props.questions.length)
		}
	}


	onSubmit = () =>{
		const today = new Date();
		const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
		this.setState({
			submitted: true,
			submitted_time: time
		})

		// Send answers to backend
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

	onChangeAnswer = (idx, ans) => {
		var temp = this.state.answers;
		temp[idx] = ans;
		this.setState({
			answers: temp 
		});
	}
	render(){

		const allQuestions = this.props.questions.map((user, i) => {
          return (
            <React.Fragment>
            <Question
              key={i}
              num={i+1}
              question_type={this.props.questions[i].question_type}
              content={this.props.questions[i].content} 
              answer={this.props.questions[i].answer}
              positive_marks={this.props.questions[i].positive_marks}
              negative_marks={this.props.questions[i].negative_marks}
              onChangeAnswer = {this.onChangeAnswer}
              />
              </React.Fragment>
          );
        });

		return (
			<div>
				<h1 className="f1  garamond"> {this.props.quiz.quiz_title} </h1>
				{allQuestions}
				<div className="w-100 center">
				<button class="center f6 link pointer br1 fr mr4 ph3 pv2 mb2 shadow-4 dib white bg-gray" onClick={this.onSubmit}> Submit </button>
				</div>
			</div>
		);
	}


}

export default QuestionList;