import React from 'react';

const QuizInfoPage = (props) => {
	return (
		<div> 
			<h2 className="center f2 underline black"> {props.quiz.quiz_title} </h2>
			<header className="bg-light-yellow sans-serif w-50 center">
				<div className="mw9 center pa4 ph7-l">
				<h4 className="f3 fw1 georgia i">
				{props.quiz.content}
				</h4>
				</div>
			</header>
			<div className="w-50 center ma2 pa2">
				<button onClick = {() => props.onRouteChange('QuestionList')} className="f6 link pointer br1 fr mr4 ph3 pv2 mb2 shadow-4 dib white bg-gray" > Take Quiz! </button>
			</div>
		</div>
	);
} 

export default QuizInfoPage;