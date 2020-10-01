export function getAppointmentsForDay(state, day) {
  const filtered = state.days.filter( x => x.name === day );
  if(filtered.length === 0)
    return [];
  const appointmentsList = filtered[0].appointments;
  const appointmentsObjs = appointmentsList.map( x => state.appointments[x.toString()] );
  return appointmentsObjs;
}