import { useEffect, useState, useReducer } from "react";
import deepcopy from "deepcopy";
import axios from "axios";

function reducer(state, action) {
  const stateCopy = deepcopy(state);

  switch (action.type) {
    case "setDay":
      stateCopy.day = action.value;
      return stateCopy;
    case "cancelInterview":
      stateCopy.appointments[action.value] = null;
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
        setState((prev) => ({
          ...prev,
          days: responses[0].data,
          appointments: responses[1].data,
          interviewers: responses[2].data,
        }));
      }
    );
  }, []);

  function loadSpots() {
    axios
      .get("http://localhost:8001/api/days")
      .then((res) => setState((prev) => ({ ...prev, days: res.data })));
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
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
      .put(`http://localhost:8001/api/appointments/${id}`, { interview })
      .then((res) => {
        setState({ ...state, appointments });
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
