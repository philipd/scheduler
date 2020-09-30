import React, { useState } from "react";
import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";

const days = [
  {
    id: 1,
    name: "Monday",
    spots: 2,
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5,
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0,
  },
];

const interviewers = [
  { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
  { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
  { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" },
  { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
  { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" }
];

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: interviewers[0]
    }
  },
  {
    id: 3,
    time: "7pm",
    interview: {
      student: "Nubya Garcia",
      interviewer: interviewers[2]
    }
  },
  {
    id: 4,
    time: "10am",
    interview: {
      student: "Andrew Hill",
      interviewer: interviewers[3]
    }
  },
  {
    id: 5,
    time: "10pm",
    interview: {
      student: "Wayne Shorter",
      interviewer: interviewers[4]
    }
  }
];

export default function Application(props) {
  const [day, setDay] = useState("Monday");

  console.log(appointments);
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
            days={days}
            day={day}
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
        {appointments.map(appointment =>
          <Appointment
            key={appointment.id} {...appointment}
          />)}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
