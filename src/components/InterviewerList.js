import React from "react";
import PropTypes from "prop-types";
import InterviewerListItem from "components/InterviewerListItem";
import "components/InterviewerList.scss";

export default function InterviewerList(props) {

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

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
}