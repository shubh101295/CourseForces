import React from 'react';
import Card from '../Card/Card';

const CardList = ({type, courses }) => {
  return (
    <div>
      {
        courses.map((user, i) => {
          return (
            <React.Fragment>
            <Card
              key={i}
              course_code={courses[i].course_code}
              course_name={courses[i].course_name}
              />
              </React.Fragment>
          );
        })
      }
    </div>
  );
}

export default CardList;