import React, { Fragment } from 'react'
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import useVisualMode from 'hooks/useVisualMode';

import "components/Appointment/styles.scss"

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    transition(SAVING);
    const interview = {
      student: name,
      interviewer
    };
    Promise.resolve(props.bookInterview(props.id, interview))
      .then(res => transition(SHOW))
      .catch(err => console.log("Error:", err))
  }

  function deleteInterview() {
    transition(DELETING);
    Promise.resolve(props.cancelInterview(props.id))
      .then(res => transition(EMPTY))
      .catch(err => console.log("Error:", err))
  }

  return (
    <article className="appointment">
      <>
        <Header time={props.time}/>
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && (<Show student={props.interview.student} interviewer={props.interview.interviewer} onDelete={deleteInterview} />)}
        {mode === CREATE && <Form interviewers={props.interviewers} onCancel={() => back()} onSave={save}/>}
        {mode === SAVING && <Status message={"Saving"} />}
        {mode === DELETING && <Status message={"Deleting"} />}
      </>
    </article>
  )

}