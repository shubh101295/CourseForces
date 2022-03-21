import React from 'react';

class Question extends React.Component {
  constructor(props){
  	super(props);
  	this.state= {
  		checked_radio_option: '',
  		checkbox_options: new Set(),
  		true_false: '',
  		subjective: ''
  	}
  }

  onClickRadio = (event) => {
  	var c = this.state.checked_radio_option
  	this.setState({
  		checked_radio_option: c===Number(event.target.id) ? '':Number(event.target.id)
  	});
  }

  onClickCheck = (event) => {
  	var s = this.state.checkbox_options;
  	var x = Number(event.target.id);
  	if(s.has(x)){
  		s.delete(x)
  	}
  	else{
  		s.add(x)
  	}
  	this.setState({
  		checkbox_options:s 
  	});

  }

  onClickTF = (event) => {
  	var c = this.state.true_false
  	this.setState({
  		true_false: c===event.target.value ? '': event.target.value
  	});
  }

  	onChangeSub = (event) => {
  		this.setState({
  			subjective:event.target.value 
  		});
  	}

  

  render(){

	  return (
	  	<div>
		    <div className='flex flex-column w-75 center tc bg-light-yellow br3 pa3 ma3 dib bw2 shadow-5'>
		      <h2 className="serif f3"> Question #{this.props.num}: {this.props.content.heading} </h2>
		      <h4 className="f4 red mt0 i garamond" > Positive Score: {this.props.positive_marks}, Negative Score: {this.props.negative_marks} </h4>
		      {
		      	this.props.question_type==='MCQ'
		      	? <div>
					<form class="center pa2 flex flex-column">
					    <div class="flex items-center w-100 mb2">
					      <input class="mr2 ml4" onChange={this.onClickRadio} type="checkbox" checked={this.state.checked_radio_option===1} id={1} value={this.props.content.options.option1} />
					      <label class="serif pl3 f4 i lh-copy">{this.props.content.options.option1}</label>
					    </div>
					    <div class="flex items-center w-100 mb2">
					      <input onChange={this.onClickRadio} class="mr2 ml4" type="checkbox" checked={this.state.checked_radio_option===2} id={2} value={this.props.content.options.option2} />
					      <label class="f4 pl3 i serif lh-copy">{this.props.content.options.option2}</label>
					    </div>
					    <div class="flex items-center w-100 mb2">
					      <input onChange={this.onClickRadio} class="mr2 ml4" type="checkbox" checked={this.state.checked_radio_option===3} id={3} value={this.props.content.options.option3} />
					      <label  class="f4 i pl3 serif lh-copy">{this.props.content.options.option3}</label>
					    </div>
					    <div class="flex items-center w-100 mb2">
					      <input onChange={this.onClickRadio} class="mr2 ml4" type="checkbox" checked={this.state.checked_radio_option===4} id={4} value={this.props.content.options.option4} />
					      <label class="f4 i pl3 serif lh-copy">{this.props.content.options.option4}</label>
					    </div>
					</form>
		      	</div>
		      	: this.props.question_type==='MSQ'
		      	? <div>
		      		<form class="center pa2 flex flex-column">
					    <div class="flex items-center w-100 mb2">
					      <input class="mr2 ml4" onChange={this.onClickCheck} type="checkbox" id={1}  value={this.props.content.options.option1} />
					      <label class="serif pl3 f4 i lh-copy">{this.props.content.options.option1}</label>
					    </div>
					    <div class="flex items-center w-100 mb2">
					      <input onChange={this.onClickCheck} class="mr2 ml4" type="checkbox" id={2}  value={this.props.content.options.option2} />
					      <label class="f4 pl3 i serif lh-copy">{this.props.content.options.option2}</label>
					    </div>
					    <div class="flex items-center w-100 mb2">
					      <input onChange={this.onClickCheck} class="mr2 ml4" type="checkbox" id={3}  value={this.props.content.options.option3} />
					      <label  class="f4 i pl3 serif lh-copy">{this.props.content.options.option3}</label>
					    </div>
					    <div class="flex items-center w-100 mb2">
					      <input onChange={this.onClickCheck} class="mr2 ml4" type="checkbox" id={4}  value={this.props.content.options.option4} />
					      <label class="f4 i pl3 serif lh-copy">{this.props.content.options.option4}</label>
					    </div>
					</form>
		      	 </div>
		      	: this.props.question_type==='T/F'
		      	? <div>
		      		<form class="center pa2 flex flex-column">
					    <div class="flex items-center w-100 mb2">
					      <input class="mr2 ml4" onChange={this.onClickTF} type="checkbox" checked={this.state.true_false==="true"} id={1} value="true" />
					      <label class="serif pl3 f4 i lh-copy">True</label>
					    </div>
					    <div class="flex items-center w-100 mb2">
					      <input onChange={this.onClickTF} class="mr2 ml4" type="checkbox" checked={this.state.true_false==="false"} id={2} value="false" />
					      <label class="f4 pl3 i serif lh-copy">False</label>
					    </div>
					</form>
		      	</div>
		      	: this.props.question_type==='Subjective'
		      	?  <textarea id="comment" onChange={this.onChangeSub} class="db center border-box hover-black w-100 measure ba b--black-20 pa2 br2 mb2" aria-describedby="comment-desc"></textarea>
		      	: <h2 className="red"> Invalid Question Type!</h2>
		      }
		    </div>
	    </div>
	  );
	}
}

export default Question;