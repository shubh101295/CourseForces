import React from 'react';
import Student from '../Student/Student';

const StudentList = (props) => {
  const allStudents = props.students.map((user, i) => {
          return (
          <div>
              <div className="measure center">
              <React.Fragment className="dt w-100 bb b--black-05 pb2 mt2">
              <Student
                key={i}
                name={props.students[i].name}
                username={props.students[i].username}
                />
                </React.Fragment>
                </div>
              </div>
          );
        });
  return (
    <div>
      <h1 className="f1 mid-gray helvetica"> Students enrolled in {props.course_code} </h1>
      {allStudents}
      <button class="f6 link pointer br1 mt4 mr4 ph3 pv2 mb2 shadow-4 dib white bg-gray" onClick={() => props.onRouteChange('InviteForm')} >Invite Students</button>
    </div>
  );
}

export default StudentList;