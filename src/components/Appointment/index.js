import React from "react";

import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "components/Appointment/Form";


import "components/Appointment/styles.scss"

const classNames = require('classnames')



export default function Appointment (props) {

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";

const {mode, transition, back} = useVisualMode(
  props.interview ? SHOW : EMPTY
)
  return (
  <article className="appointment">
    <Header time={props.time}/>
    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
    {mode === SHOW && (
    //{props.interview ? 
    (<Show
    student = {props.interview.student}
    interviewer = {props.interview.interviewer}
  />) 
  // :
  // (<Empty />)
    )}

    {mode === CREATE && (
      <Form 
      interviewers = {props.interviewers}
      onCancel={() => back()}
      />
    )}
  </article>
  )
}