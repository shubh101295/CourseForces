import React from 'react';
import Quiz from '../QuizCard/QuizCard';
import Add from '../Add/Add'

const QuizList = (props) => {
  const allCards = props.quizzes.map((user, i) => {
          return (
            <React.Fragment>
            <Quiz
              onRouteChange={props.onRouteChange}
              key={i}
              quiz_title={props.quizzes[i].quiz_title}
              />
              </React.Fragment>
          );
        });
  return (
    <div>
      <h1 className="f1 mid-gray helvetica"> Quizzes for {props.course_code} {props.role==='Teacher'? <button class="f6 link pointer br1 fr mr4 ph3 pv2 mb2 shadow-4 dib white bg-gray" onClick = {() => props.onRouteChange('StudentList')}  >View Course Users</button> : <div />} </h1>
      {allCards}
      {
        props.role==="P"
        ? <Add text="Quiz" onRouteChange={props.onRouteChange} route="CreateQuiz" />
        : < div />
      }
    </div>
  );
}

export default QuizList;