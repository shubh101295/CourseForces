import React from 'react';
import Question from '../Question/Question'

class QuestionList extends React.Component {
	constructor(props) {
		super(props);
		var arr = []
		for (var i = 0; i < this.props.questions.length; i++) {
			arr.push({
				question_pk : '1',
				answer: ''
			})
		}
		this.state = {
			submitted: false,
			submitted_time: '',
			answers : arr
		}
	}


	onSubmit = () =>{
		alert(this.state.answers)
		fetch('http://127.0.0.1:8000/quiz/make/submission/', {
	      method: 'post',
	      headers: {
	        'Content-Type': 'application/json',
	        'Authorization': this.props.token
	      },
	      body: JSON.stringify({
	      	course_pk : this.props.course_pk,
	      	quiz_pk : this.props.quiz_pk,
	      	ques_response: this.state.answers
	      })
	    })
	    .then(response => {return response.json()})
	    .then(response => {
	    	if(response.message==="Succesully submitted the quiz response")
		    	alert("Successfully Submitted!")
		    else
		    	throw new Error(response.message)
	    })
	    .catch(error=> {
	    	alert(error)
	    })
		this.props.onRouteChange('CoursePage')
	}

	onChangeAnswer = (idx, ans) => {
		let temp = [];
		var x;
		if (this.props.questions[idx].question_type==='F') {
			x=ans
		}
		else{
			x = Array.from(ans)
		}
		// alert(x)
		for (var i = 0; i < this.state.answers.length; i++) {
			if(i===idx){
				// alert(i)
				temp.push({
					question_pk: this.props.questions[idx].question_pk,
					answer:x
				})
				// alert(temp)
			}
			else{
				// alert(this.state.answers[i])
				temp.push(this.state.answers[i])
				// alert(temp)
			}
		}
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
              questions={this.props.questions[i]}
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
				{
					this.props.role === 'S'
					? <button class="center f6 link pointer br1 fr mr4 ph3 pv2 mb2 shadow-4 dib white bg-gray" onClick={this.onSubmit}> Submit </button>
					: <div />
				}</div>
			</div>
		);
	}


}

export default QuestionList;