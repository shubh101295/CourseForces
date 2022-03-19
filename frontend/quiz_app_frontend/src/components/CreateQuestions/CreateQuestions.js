import React from 'react';

const initialState = {
			type_selected: false,
			question_type: '',
			heading: '',
			options: [],
			answer: '',
			positive_marks: '',
			negative_marks: '',
			partial_allowed: false,
			done: 0,
			questions : []
}
class CreateQuestions extends React.Component {
	constructor(props){
		super(props);
		this.state = initialState
	}

	onTypeChange = (event) => {
		if (event.target.value === "Choose Type") {
			alert("Choose a question type please!")
			this.setState({
				type_selected:false,
				question_type: '' 
			});
			return
		}
		this.setState({
				type_selected: true,
				question_type: event.target.value
		});

		switch(this.state.question_type) {
		  case "MCQ":
		  		this.setState({
		  				options: ['', '', '', '']
		  		})
			    break;
		  case "MSQ":
		  		this.setState({
		  				options: ['', '', '', '']
		  		})
			    break;
		  case "T/F":
		  		this.setState({
		  				options: [true,false]
		  		})
		  		break;
		  default:
		  		break;
		}

	}
	onQuestionChange = (event) => {
		this.setState({heading:event.target.value});
	}
	onOptionChange = (idx,event)=>{
		var options = this.state.options;
		options[idx-1] = event.target.value
		this.setState({options: options});
	}
	onAnswerChangeMSQ = (event) => {
		var ans = new Array(event.target.value.length)
		for (var i = 0; i < ans.length; i++) {
			ans[i] = Number(event.target.value[i])
		}

		this.setState({answer:ans});
	}
	onAnswerChangeMCQ = (event) => {
		if(event.target.value.length > 1){
			alert("For MCQ, only one option must be correct!")
			return
		}
		this.setState({answer:Number(event.target.value)});
	}

	onAnswerChangeTF = (event) => {
		if(event.target.value === "Choose Value"){
			alert("Choose True or False!")
			return
		}
		this.setState({answer: (event.target.value==="True"? true:false)});
	}
	onAnswerChangeSub = (event) => {
		this.setState({answer: event.target.value});
	}

	onAdd = (end) => {

		if (this.state.heading.length===0 ) {
			alert('Question Field can not be empty!')
			return
		}
		if (this.state.partial_allowed === "Choose Value") {
			alert("Choose whether partial marking is allowed or not!")
			return
		}
		if (this.state.positive_marks === '' || this.state.negative_marks === '') {
			alert("Empty input is invalid!")
			return
		}
		if (this.state.question_type==='MCQ' || this.state.question_type === 'MSQ') {
			if (this.state.options.length===0 || this.state.answer.length===0) {
				alert("Empty Input is invalid!")
				return
			}
		} 
		else {
			if (this.state.question_type==='T/F') {
				if (this.state.answer==="Choose Value") {
					alert("Choose True or False!")
					return
				}
			}
			else{
				if (this.state.answer.length === 0) {
					alert("Answer field empty :(")
					return
				}
			}
		}
		var done = this.state.done;
		var questions = this.state.questions;
		questions.push({
			question_type: this.state.question_type,
			content: {
				heading: this.state.heading,
				options: this.state.options
			},
			answer: this.state.answer,
			positive_marks: this.state.positive_marks,
			negative_marks: this.state.negative_marks,
			partial_allowed: this.state.partial_allowed
		});
		this.setState(initialState);
		this.setState({
			done:done+1,
			questions:questions 
		});
		if (end) {
			alert('Woohooo! Quiz Created!')
			// Send the quiz object to backend and then redirect
			this.props.onRouteChange('CoursePage')
		}
	}
	

	onPosMark = (event) => {
		this.setState({
			positive_marks: Number(event.target.value) 
		});
	}
	onNegMark = (event) => {
		this.setState({
			negative_marks: Number(event.target.value) 
		});
	}

	partial = (event) => {
		if(event.target.value === "Choose Value"){
			alert("Choose Yes or No!")
			return
		}
		this.setState({partial_allowed: (event.target.value==="True"? true:false)})
	}

	render(){
		return (
			<div>
				<div className="gray f2 serif"> {`Question #${this.state.done+1}`} </div>
				<div class="db center mw5 mw6-ns hidden br2 shadow-5 ">
					<h3 className="db"> Select Question Type:
						<select onChange={this.onTypeChange} id="types" className="w-50 center db mt2 h2 f6 bg-transparent ba" name="">
		                <option label="Choose Type" value="Choose Type"></option>
		                <option label="MCQ" value="MCQ"></option>
		                <option label="MSQ" value="MSQ"></option>
		                <option label="True/False" value="T/F"></option>
		                <option label="Subjective" value="Subjective"></option>
		              </select>
					</h3>
					<div className="w-100">
						<h3 className="f4 bold serif">Postive Marks: <input onKeyPress={(event) => {if (!/[0-9]/.test(event.key)) {event.preventDefault();}}} id="num_of_questions" className="dib ml2 input-reset ba b--black-20 pa2 mb2 db w-50"
			  			onChange={this.onPosMark}
						/> </h3>
					</div>
					<div className="w-100">
						<h3 className="f4 bold serif">Negative Marks: <input onKeyPress={(event) => {if (!/[0-9]/.test(event.key)) {event.preventDefault();}}} id="num_of_questions" className="dib ml2 input-reset ba b--black-20 pa2 mb2 db w-50"
			  			onChange={this.onNegMark}
						/> </h3>
					
					</div>
					{
						this.state.question_type==='MCQ'
						? <div> 
							<div className="w-100">
								<h3 className="f4 bold serif">Question: <input  className="dib ml3 mt2 input-reset ba b--black-20 pa2 mb2 db w-50"
					  			type="text"
					  			onChange={this.onQuestionChange}
								/> </h3>
							</div>
							<div className="w-100">
								<h3 className="f4 bold serif">Option #1: <input  className="dib ml3 input-reset ba b--black-20 pa2 mb2 db w-50"
					  			onChange={(event) => this.onOptionChange(1,event)}
					  			type="text"
								/> </h3>
							</div>
							<div className="w-100">
								<h3 className="f4 bold serif">Option #2: <input  className="dib ml3 input-reset ba b--black-20 pa2 mb2 db w-50"
					  			type="text"
					  			onChange={(event) => this.onOptionChange(2,event)}
								/> </h3>
							</div>
							<div className="w-100">
								<h3 className="f4 bold serif">Option #3: <input  className="dib ml3 input-reset ba b--black-20 pa2 mb2 db w-50"
					  			type="text"
					  			onChange={(event) => this.onOptionChange(3,event)}
								/> </h3>
							</div>
							<div className="w-100">
								<h3 className="f4 bold serif">Option #4: <input  className="dib ml3 input-reset ba b--black-20 pa2 mb2 db w-50"
					  			onChange={(event) => this.onOptionChange(4,event)}
								/> </h3>
							</div>
							<div className="w-100">
								<h3 className="f4 bold serif">Correct Option: <input onKeyPress={(event) => {if (!/[0-9]/.test(event.key)) {event.preventDefault();}}} id="num_of_questions" className="dib ml2 input-reset ba b--black-20 pa2 mb2 db w-50"
					  			onChange={this.onAnswerChangeMCQ}
								/> </h3>
							</div>
						</div>
						: this.state.question_type==='MSQ'
						?<div>
							<h3 className="f4 mr4 serif"> Partial allowed:
								<select onChange={this.partial} id="types" className="dib w-50 ml3	 db mt2 mb2 h2 f6 bg-transparent ba" name="">
				                <option label="Choose Value" value="Choose Value"></option>
				                <option label="Yes" value="True"></option>
				                <option label="No" value="False"></option>
				              </select>
							</h3>
							<div className="w-100">
								<h3 className="f4 bold serif">Question: <input  className="dib ml2 mt2 input-reset ba b--black-20 pa2 mb2 db w-50"
					  			type="textarea"
					  			onChange={this.onQuestionChange}
								/> </h3>
							</div>
							<div className="w-100">
								<h3 className="f4 bold serif">Option #1: <input  className="dib ml2 input-reset ba b--black-20 pa2 mb2 db w-50"
					  			onChange={(event) => this.onOptionChange(1,event)}
					  			type="text"
								/> </h3>
							</div>
							<div className="w-100">
								<h3 className="f4 bold serif">Option #2: <input  className="dib ml2 input-reset ba b--black-20 pa2 mb2 db w-50"
					  			type="text"
					  			onChange={(event) => this.onOptionChange(2,event)}
								/> </h3>
							</div>
							<div className="w-100">
								<h3 className="f4 bold serif">Option #3: <input  className="dib ml2 input-reset ba b--black-20 pa2 mb2 db w-50"
					  			type="text"
					  			onChange={(event) => this.onOptionChange(3,event)}
								/> </h3>
							</div>
							<div className="w-100">
								<h3 className="f4 bold serif">Option #4: <input className="dib ml2 input-reset ba b--black-20 pa2 mb2 db w-50"
					  			onChange={(event) => this.onOptionChange(4,event)}
								/> </h3>
							</div>
							<div className="w-100">
								<h3 className="f4 bold serif">Correct Options: <input onKeyPress={(event) => {if (!/[0-9]/.test(event.key)) {event.preventDefault();}}} id="num_of_questions" className="dib ml2 input-reset ba b--black-20 pa2 mb2 db w-50"
					  			onChange={this.onAnswerChangeMSQ}
								/> </h3>
							</div>	
						</div>
						: this.state.question_type==='T/F'
						? <div>
							 <div className="w-100">
								<h3 className="f4 bold serif">Question: <input  className="dib ml3 mt2 input-reset ba b--black-20 pa2 mb2 db w-50"
					  			type="text"
					  			onChange={this.onQuestionChange}
								/> </h3>
							</div>
							<h3 className="f4 mr4 serif"> Answer:
								<select onChange={this.onAnswerChangeTF} id="types" className="dib w-50 ml3	 db mt2 h2 f6 bg-transparent ba" name="">
				                <option label="Choose Value" value="Choose Value"></option>
				                <option label="True" value="True"></option>
				                <option label="False" value="False"></option>
				              </select>
							</h3>
						  </div>
						: this.state.question_type==='Subjective'
						?  <div>
								<div className="w-100">
									<h3 className="f4 bold serif">Question: <input  className="dib ml3 mt2 input-reset ba b--black-20 pa2 mb2 db w-50"
						  			type="text"
						  			onChange={this.onQuestionChange}
									/> </h3>
								</div>
								<div className="w-100">
									<h3 className="f4 bold serif">Answer: <input  className="dib ml3 mt2 input-reset ba b--black-20 pa2 mb2 db w-50"
						  			type="text"
						  			onChange={this.onAnswerChangeSub}
									/> </h3>
								</div>
						   </div>
						: <div />
					}
					{
						this.state.type_selected && (this.state.done+1)===this.props.num
						? <button className="f6 link pointer br1  mr4 ph3 pv2 mb2 shadow-4 dib white bg-gray" onClick={() => this.onAdd(true)}> Finish!</button>
						: this.state.type_selected
						?<button className="f6 link pointer br1  mr4 ph3 pv2 mb2 shadow-4 dib white bg-gray" onClick={() => this.onAdd(false)} > Add Next Question</button>
						: <div />
					}
				</div>
			</div>
		);
	}
}

export default CreateQuestions;