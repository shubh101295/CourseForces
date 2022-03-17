import React from 'react';

const Card = (props) => {
  return (
    <div className='tc grow bg-light-yellow br3 pa3 ma2 dib bw2 shadow-5'>
      <img alt='robots' style={{height:'200px', width:'200px'}} src={`https://robohash.org/${props.course_code}?200x200`} />
      <div>
        <h2>{props.course_name}</h2>
        <p>{props.course_code}</p>
      </div>
    </div>
  );
}

export default Card;