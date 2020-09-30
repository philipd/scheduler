import React from "react";
import classNames from "classnames";
import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {
  const { setInterviewer, avatar, name } = props;

  const interviewerClass = classNames("interviewers__item",
    {
      "interviewers__item--selected": props.selected
      // "interviewer-list__item--clickable": props.sports === 0
    });

  return (
    <li className={ interviewerClass } onClick={ setInterviewer }>
      <img
        className="interviewers__item-image"
        src={ avatar }
        alt={ name }
      />
      {props.selected && props.name}
    </li>

  );
}