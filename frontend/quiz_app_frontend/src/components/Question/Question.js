import React from 'react';

const Question = (props) => {
  return (
    <div className='flex flex-column w-75 center tc bg-light-yellow br3 pa3 ma2 dib bw2 shadow-5'>
      <h2 className="serif "> Question #{props.num}: {props.content.heading} </h2>
      
    </div>
  );
}

export default Question;