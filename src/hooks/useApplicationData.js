import { useEffect, useState, useReducer } from "react";
import deepcopy from "deepcopy";
import axios from "axios";

function reducer(state, action) {
  const stateCopy = deepcopy(state);

  switch (action.type) {
    case "setDays":
      stateCopy.days = action.value;
      return stateCopy;
    case "setDay":
      stateCopy.day = action.value;
      return stateCopy;
    case "cancelInterview":
      stateCopy.appointments[action.value].interview = null;
      return stateCopy;
    case "bookInterview":
      stateCopy.appointments[action.value.id].interview = action.value.interview;
      return stateCopy;
    case "load":
      stateCopy.days = action.value.days;
      stateCopy.appointments = action.value.appointments;
      stateCopy.interviewers = action.value.interviewers;
      return stateCopy;
    default:
      throw new Error();
  }
}

const initialState = {
  day: "Monday",
  days: [],
  appointments: {},
  interviewers: {},
};

export default function useApplicationData(initial) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setDay = (day) => dispatch({ type: "setDay", value: day });

  useEffect(() => {
    const daysPromise = axios.get("http://localhost:8001/api/days");
    const appointmentsPromise = axios.get(
      "http://localhost:8001/api/appointments"
    );
    const interviewersPromise = axios.get(
      "http://localhost:8001/api/interviewers"
    );

    Promise.all([daysPromise, appointmentsPromise, interviewersPromise]).then(
      (responses) => {
        dispatch({
          type: "load",
          value: {
            days: responses[0].data,
            appointments: responses[1].data,
            interviewers: responses[2].data,
          },
        });
      }
    );
  }, []);

  function loadSpots() {
    axios.get("http://localhost:8001/api/days").then((res) => {
      dispatch({ type:'setDays', value: res.data });
    });
  }

  function cancelInterview(id) {
    return axios
      .delete(`http://localhost:8001/api/appointments/${id}`, {})
      .then((res) => {
        dispatch({ type: "cancelInterview", value: id });
        loadSpots();
      });
  }

  function bookInterview(id, interview) {
    return axios
      .put(`http://localhost:8001/api/appointments/${id}`, { interview })
      .then((res) => {
        console.log('response', interview);
        dispatch({ type: "bookInterview", value: { id, interview } });
        loadSpots();
      });
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
}
