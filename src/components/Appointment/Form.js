import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form(props) {
  const { name, interviewers, interviewer, onSave, onCancel, setInterviewer } = props;
  // const { name, setName } = useState("");
  // const { interviewer, setInterviewer } = useState(null);

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            value={ name || "" }
            type="text"
            placeholder="Enter Student Name"
          /*
            This must be a controlled component
          */
          />
        </form>
        <InterviewerList 
          interviewers={interviewers} 
          value={interviewer || null} 
          onChange={setInterviewer} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={onCancel} danger>Cancel</Button>
          <Button onClick={onSave} confirm>Save</Button>
        </section>
      </section>
    </main>

  );
}