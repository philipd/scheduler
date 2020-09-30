import React from "react";
import classNames from "classnames";
import InterviewerListItem from "components/InterviewerListItem";
import "components/InterviewerList.scss";

export default function InterviewerList(props) {
  const { interviewers, interviewer, setInterviewer } = props;

  const interviewerListClass = classNames("",
    {
      // "interviewers__item--selected": 
      // "interviewer-list__item--clickable": props.sports === 0
    });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewers.map(
          (thisInterviewer) => {
            const { name, avatar, id } = thisInterviewer;
            return <InterviewerListItem
              name={ name }
              avatar={ avatar }
              setInterviewer={ (event) => setInterviewer(id) }
              selected={ interviewer === id }
              id={id}
            />;
          })}
      </ul>
    </section>
  );
}