import React, { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import axios from "axios";
import { getAppointmentsForDay } from "helpers/selectors";

export default function Application(props) {

  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  });

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    const daysPromise = axios.get('http://localhost:8001/api/days');
    const appointmentsPromise = axios.get('http://localhost:8001/api/appointments');
    const interviewersPromise = axios.get('http://localhost:8001/api/interviewers');

    Promise.all([daysPromise, appointmentsPromise, interviewersPromise])
      .then((responses) => {
        setState(prev => ({ ...prev, days: responses[0].data, appointments: responses[1].data, interviewers: responses[2].data }));
      });
  }, []);

  return (
    <main className="layout">
      <section className="sidebar">
        {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>

        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />

      </section>
      <section className="schedule">
        {dailyAppointments.map(appointment =>
          <Appointment
            key={appointment.id} {...appointment}
          />)}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
