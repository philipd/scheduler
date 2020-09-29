import React from "react";
import classNames from "classnames";
import InterviewerListItem from "components/InterviewerListItem";
import "components/InterviewerList.scss";

export default function InterviewerList(props) {
  const interviewerListClass = classNames("",
    {
      "interviewers__item--selected": props.selected
      // "interviewer-list__item--clickable": props.sports === 0
    });

  // const formatSpots = (spots) => {
  //   return `${spots ? spots : 'no'} spot${spots === 1 ? '' : 's'} remaining`;
  // };

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {props.interviewers.map(
          (interviewer, index) => {
            return <InterviewerListItem
              name={props.interviewer === index + 1 ? interviewer.name : ''}
              avatar={interviewer.avatar}
              setInterviewer={interviewer.setInterviewer}
              selected={props.interviewer === index + 1}
            />;
          })}
      </ul>
    </section>
  );
}