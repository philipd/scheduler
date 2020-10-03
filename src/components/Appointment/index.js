import React from 'react';
import "components/Appointment/styles.scss";
import Header from 'components/Appointment/Header';
import Show from 'components/Appointment/Show';
import Empty from 'components/Appointment/Empty';
import Form from 'components/Appointment/Form';
import useVisualMode from 'hooks/useVisualMode';
import Status from 'components/Appointment/Status';
import Confirm from 'components/Appointment/Confirm';

// const interviewers = [
//   { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
//   { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
//   { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" },
//   { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
//   { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" }
// ];

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const EDIT = "EDIT";
  const CONFIRM = "CONFIRM";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    const result = props.bookInterview(props.id, interview);
    result.then(res => transition(SHOW));
  }

  function cancel() {
    // transition(CONFIRM);
    transition(DELETING);
    props.cancelInterview(props.id)
      .then(res => transition(EMPTY));
  }

  // function edit() {
  //   transition(SAVING);
  //   props.editInterview(props.id)
  //     .then(res => transition(SHOW));
  // }

  return <article className="appointment">
    <Header time={props.time} />
    {mode === CONFIRM && <Confirm onConfirm={cancel} onCancel={() => back()} />}
    {mode === SAVING && <Status message='Saving ...' />}
    {mode === DELETING && <Status message='Deleting ...' />}
    {mode === EMPTY && <Empty id={props.id} onAdd={() => transition(CREATE)} />}
    {mode === CREATE && <Form id={props.id} onSave={save} interviewers={props.interviewers} onCancel={() => back()} />}
    {mode === EDIT && <Form id={props.id} name={props.interview.student} interviewer={props.interview.interviewer.id} onSave={save} interviewers={props.interviewers} onCancel={() => back()} />}
    {mode === SHOW && (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        interview={props.interview}
        onDelete={() => transition(CONFIRM) }
        onEdit={ () => transition(EDIT) }
      />
    )}
  </article>;
}