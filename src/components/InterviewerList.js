import React from "react";
import classNames from "classnames";
import "components/InterviewerList.scss";

export default function InterviewerList(props) {
  const interviewerListClass = classNames("interviewers__item",
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
      <ul className="interviewers__list"></ul>
    </section>
  );
}