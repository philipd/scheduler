import React from "react";

export default function Header(props) {
  const { time } = props;
  
  return <header className="">
    <h4 className="text--semi-bold">{ time }</h4>
    <hr className="appointment__separator" />
  </header>
}