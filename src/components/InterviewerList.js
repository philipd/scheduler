import React from "react";
import classNames from "classnames";
import InterviewerListItem from "components/InterviewerListItem";
import "components/InterviewerList.scss";

export default function InterviewerList(props) {
  // const { interviewers, interviewer, setInterviewer } = props;

  const interviewerListClass = classNames("",
    {
      // "interviewers__item--selected": 
      // "interviewer-list__item--clickable": props.sports === 0
    });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {props.interviewers.map(
          (interviewer) => {
            const { name, avatar, id } = interviewer;
            return <InterviewerListItem
              name={ name }
              avatar={ avatar }
              setInterviewer={ (event) => props.setInterviewer(id) }
              selected={ props.interviewer === id }
              id={id}
              key={id}
            />;
          })}
      </ul>
    </section>
  );
}