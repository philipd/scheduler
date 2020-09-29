import React from "react";
import classNames from "classnames";
import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {
  const interviewerClass = classNames("interviewers__item",
    {
      "interviewers__item--selected": props.selected
      // "interviewer-list__item--clickable": props.sports === 0
    });

  // const formatSpots = (spots) => {
  //   return `${spots ? spots : 'no'} spot${spots === 1 ? '' : 's'} remaining`;
  // };

  return (
    <li className={interviewerClass} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>

  );
}