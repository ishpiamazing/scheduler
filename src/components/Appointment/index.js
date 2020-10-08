import React from "react";

import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error"


import "components/Appointment/styles.scss"


const classNames = require('classnames')



export default function Appointment (props) {

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETE = "DELETE";
const CONFIRM = "CONFIRM";
const EDIT ="EDIT";
const ERROR_SAVE ="ERROR_SAVE";
const ERROR_DELETE="ERROR_DELETE";


const {mode, transition, back} = useVisualMode(
  props.interview ? SHOW : EMPTY
)

function save(name, interviewer) {
  const interview = {
    student: name,
    interviewer
  };
  transition(SAVING, true);
  props.bookInterview(props.id, interview)
  .then(() => transition(SHOW))
  .catch(() =>transition(ERROR_SAVE,true));
}

function cancel() {
  transition(DELETE, true);
  props.cancelInterview(props.id)
  .then(() => transition(EMPTY))
  .catch(() => transition(ERROR_DELETE,true));
}


  return (
  <article className="appointment" data-testid="appointment">
    <Header time={props.time}/>
    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
    {mode === SAVING && (<Status message="Saving..."></Status>)}
    {mode === SHOW && ( 
    (<Show
    student = {props.interview.student}
    interviewer = {props.interview.interviewer}
    onDelete={()=>transition(CONFIRM)}
    onEdit={()=> transition(EDIT)}
  />) 
  
    )}

    {mode === CREATE && (
      <Form 
      interviewers = {props.interviewers}
      onCancel={() => back()}
      onSave ={save}
      />
    )}

    {mode === DELETE && (<Status message="Deleting..."></Status>)}

    {mode === CONFIRM && (<Confirm 
    message = "Are you sure you want to delete?"
    onConfirm={cancel}
    onCancel={()=>back()} ></Confirm>)}


    {mode === EDIT && (
      <Form
      interviewers ={props.interviewers}
      name ={props.interview.student}
      interviewer={props.interview.interviewer.id}
      onSave={save}
      onCancel={()=>back()}
      />
    )}


    {mode === ERROR_SAVE &&  (
      <Error
      message ="Unable to book appointment.Please try again later."
      onClose={()=>back()}
      />
    )}


    {mode === ERROR_DELETE &&  (
      <Error
      message ="Unable to delete appointment.Please try again later."
      onClose={()=>back()}
      />
    )}
  </article>
  )
}