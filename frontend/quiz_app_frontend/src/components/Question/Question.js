import React from 'react';

const Question = (props) => {
  return (
    <div className='tc grow bg-light-yellow br3 pa3 ma2 dib bw2 shadow-5'>
      <h2> Question #{props.num}: {props.text} </h2>
      
    </div>
  );
}

export default Question;