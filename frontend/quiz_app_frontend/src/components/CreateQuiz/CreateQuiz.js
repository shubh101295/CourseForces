import React from 'react';

class CreateQuiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      num_of_questions: 0,
      title: '',
      content: '',
      deadline: '',
      start_at: '',
    }
  }

  onTitleChange = (event) => {
  	this.setState({title: event.target.value})
  }
  onContentChange = (event) => {
  	this.setState({content: event.target.value})
  }

  onStartChange = (event) => {
  	this.setState({start_at: event.target.value})
  }

  onEndChange = (event) => {
  	this.setState({deadline: event.target.value})
  }

  onTotalChange = (event) => {
  	this.setState({num_of_questions: Number(event.target.value)})
  }

  render() {
  	return (
  		<div>	
			<div class="db center mw5 mw6-ns hidden br2 shadow-5 ">
			<div className="w-100">
				<h3 className="f4 bold serif">Title: <input id="title" className="dib ml5 mt2 input-reset ba b--black-20 pa2 mb2 db w-50"
	  			type="text"
	  			onChange={this.onTitleChange}
				/> </h3>
			</div>
			<div className="w-100">
				<h3 className="f4 bold serif">Content: <input id="content" className="dib ml4 input-reset ba b--black-20 pa2 mb2 db w-50"
	  			onChange={this.onContentChange}
	  			type="text"
				/> </h3>
			</div>
			<div className="w-100">
				<h3 className="f4 bold serif">Start time: <input id="start_at" className="dib ml2 input-reset ba b--black-20 pa2 mb2 db w-50"
	  			type="text"
	  			onChange={this.onStartChange}
				/> </h3>
			</div>
			<div className="w-100">
				<h3 className="f4 bold serif">End time: <input id="deadline" className="dib ml2 input-reset ba b--black-20 pa2 mb2 db w-50"
	  			type="text"
	  			onChange={this.onEndChange}
				/> </h3>
			</div>
			<div className="w-100">
				<h3 className="f4 bold serif">Total Questions: <input onKeyPress={(event) => {if (!/[0-9]/.test(event.key)) {event.preventDefault();}}} id="num_of_questions" className="dib ml2 input-reset ba b--black-20 pa2 mb2 db w-50"
	  			onChange={this.onTotalChange}
				/> </h3>
			</div>	
			<button className="f6 link pointer br1  mr4 ph3 pv2 mb2 shadow-4 dib white bg-gray" onClick = {() => this.props.onRouteChange('CreateQuestions')}> Add Questions </button>
		</div>

  		</div>
  	);
  }
}

export default CreateQuiz;