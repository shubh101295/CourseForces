import React from 'react';
import quiz from './quiz1.jpg'
const QuizCard = (props) => {
  return (
    <div className='tc grow bg-light-yellow br3 pa3 ma2 dib bw2 shadow-5'>
      <img onClick={() => props.loadQuizInfo(props.idx)} alt='quiz' className="pointer link" style={{height:'200px', width:'200px'}} src={quiz} />
      <div>
        <h2 onClick={() => props.loadQuizInfo(props.idx)} className="f5 pointer link lh-copy measure mt2 black">{props.quiz_title}</h2>
      </div>
    </div>
  );
}

export default QuizCard;