import React from "react";
import { getAllByTestId, prettyDOM, getByText, getByAltText, getByPlaceholderText } from "@testing-library/react";

import {
  fireEvent,
  waitForElement,
  render,
  cleanup,
} from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);

    return waitForElement(() => getByText("Monday")).then(() => {
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];
    console.log(prettyDOM(appointment));

    fireEvent.click(getByAltText(appointment, "Add"));
    // await waitForElement(() => getByPlaceholderText("Enter Student Name"));
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i),
     {target: { value: "Lydia Miller-Jones"} });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));
    console.log(prettyDOM(appointment));
    // await waitForElement(() => getByPlaceholderText("Enter Student Name"));
    // expect().toBeInTheDocument();
  });
});
