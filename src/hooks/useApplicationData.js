import { useEffect, useState, useReducer } from "react";
import deepcopy from "deepcopy";
import axios from "axios";

function reducer(state, action) {
  const stateCopy = deepcopy(state);
  // console.log("hi from reducer");
  console.log("reducer state", state);
  console.log("reducer action", action);

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
      stateCopy.appointments[action.value.id] = action.value.interview;
      return stateCopy;
    // case "setDays":
    //   stateCopy.days = action.value;
    //   return stateCopy;
    // case "setAppointments":
    //   stateCopy.appointments = action.value;
    //   return stateCopy;
    // case "setInterviewers":
    //   stateCopy.interviewers = action.value;
    //   return stateCopy;
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
  const [xstate, dispatch] = useReducer(reducer, initialState);
  const [state, setState] = useState(initialState);

  const proxyHandler = {
    get: function (target, prop, receiver) {
      if (prop === "day") {
        return xstate.day;
      }
      if (prop === "days") {
        return xstate.days;
      }
      if (prop === "appointments") {
        return xstate.appointments;
      }
      if (prop === "interviewers") {
        return xstate.interviewers;
      }
      return Reflect.get(...arguments);
    },
  };

  const stateProxy = new Proxy(state, proxyHandler);

  const xsetDay = (xday) => dispatch({ type: "setDay", value: xday });

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
        // setState((prev) => ({
        //   ...prev,
        //   days: responses[0].data,
        //   // appointments: responses[1].data,
        //   interviewers: responses[2].data,
        // }));

        // dispatch({ type: "setAppointments", value: responses[1].data })
        // dispatch({ type: "setInterviewers", value: responses[2].data })
        // dispatch({ type: "setDays", value: responses[0].data })
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
      // setState((prev) => ({ ...prev, days: res.data }));
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
    // const appointment = {
    //   ...state.appointments[id],
    //   interview: { ...interview },
    // };

    // const appointments = {
    //   ...state.appointments,
    //   [id]: appointment,
    // };

    return axios
      .put(`http://localhost:8001/api/appointments/${id}`, { interview })
      .then((res) => {
        // setState({ ...state, appointments });
        dispatch({ type: "bookInterview", value: { id, interview } });
        loadSpots();
      });
  }

  return {
    state: stateProxy,
    setDay: xsetDay,
    bookInterview,
    cancelInterview,
  };
}
