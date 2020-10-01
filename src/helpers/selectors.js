export function getAppointmentsForDay(state, day) {
  const filtered = state.days.filter( x => x.name === day );
  if(filtered.length === 0)
    return [];
  const appointmentsList = filtered[0].appointments;
  const appointmentsObjs = appointmentsList.map( x => state.appointments[x.toString()] );
  return appointmentsObjs;
}

export function getInterviewersForDay(state, day) {
  const filtered = state.days.filter( x => x.name === day );
  if(filtered.length === 0)
    return [];
  const appointmentsList = filtered[0].appointments;
  const appointmentsObjs = appointmentsList.map( x => state.appointments[x.toString()] );
  const interviews = appointmentsObjs.filter( x => x.interview && x.interview.interviewer );
  const interviewersObjs = interviews.map( x => state.interviewers[x.interview.interviewer] );
  return interviewersObjs;
}

export function getInterview(state, interview) {
  if(!interview)
    return null

  let newInterview = {...interview};
  newInterview.interviewer = state.interviewers[interview.interviewer];

  return newInterview;
}