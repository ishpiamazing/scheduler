import React from "react";
import InterviewerListItem from "components/InterviewerListItem";
import "components/InterviewerList.scss"

const classNames = require("classnames");

export default function InterviewerList(props) {

  const interviewerClass = classNames("interviewers", {
    interviewers__header: props.header,
    interviewers__list: props.list
  });

  const interviewers = props.interviewers.map(interviewer => (
    <InterviewerListItem 
    key={interviewer.id}
    name={interviewer.name}
    avatar={interviewer.avatar}
    selected={interviewer.id === props.interviewer }
    setInterviewer={event => props.setInterviewer(interviewer.id)}
    />
  ))
  
  return (
  <section className={interviewerClass} >
  <h4 className="interviewers__header text--light">Interviewer</h4>
  <ul className="interviewers__list">{interviewers}</ul>
  </section>
  );
}