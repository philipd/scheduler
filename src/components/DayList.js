import React from "react";
import DayListItem from "components/DayListItem";

export default function DayList(props) {
  console.log(props);
  return props.days.map(day =>
    <DayListItem 
      name={day.name}
      spots={day.spots}
      selected={day.name === props.day}
      setDay={props.setDay}
      key={day.id} />
  );
}