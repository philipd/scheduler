import { useEffect, useState } from 'react';
import deepcopy from "deepcopy";
import axios from "axios";

export default function useApplicationData(initial) {

  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  function cancelInterview(id) {
    console.log('delete', id);
    return axios.delete(`http://localhost:8001/api/appointments/${id}`, {})
      .then(res => {
        const stateCopy = deepcopy(state);
        stateCopy.appointments[id] = null;
        setState(deepcopy);
      });
  }

  useEffect(() => {
    const daysPromise = axios.get('http://localhost:8001/api/days');
    const appointmentsPromise = axios.get('http://localhost:8001/api/appointments');
    const interviewersPromise = axios.get('http://localhost:8001/api/interviewers');
    console.log('use effect');

    Promise.all([daysPromise, appointmentsPromise, interviewersPromise])
      .then((responses) => {
        setState(prev => ({ ...prev, days: responses[0].data, appointments: responses[1].data, interviewers: responses[2].data }));
      });
  }, []);

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`http://localhost:8001/api/appointments/${id}`, { interview })
      .then((res) => {
        console.log(res);
        setState({ ...state, appointments });
        console.log('id', id, 'interview', interview);
      });
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}