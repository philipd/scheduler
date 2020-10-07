import React from "react";
import axios from "axios";
import {
  getAllByText,
  getAllByTestId,
  prettyDOM,
  getByText,
  getByAltText,
  getByPlaceholderText,
  queryByText,
  queryByAltText,
  getByDisplayValue,
} from "@testing-library/react";

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
    const { debug, container } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];
    fireEvent.click(getByAltText(appointment, "Add"));
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" },
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));
    expect(getByText(appointment, "Saving ...")).toBeInTheDocument();
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container, debug } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(
      container,
      "appointment"
    ).find((appointment) => queryByText(appointment, "Archie Cohen"));

    fireEvent.click(queryByAltText(appointment, "Delete"));

    // 4. Check that the confirmation message is shown.
    expect(
      getByText(appointment, "Delete the appointment?")
    ).toBeInTheDocument();

    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(queryByText(appointment, "Confirm"));

    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, "Deleting ...")).toBeInTheDocument();

    // 7. Wait until the element with the "Add" button is displayed.
    await waitForElement(() => getByAltText(appointment, "Add"));

    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
  });
  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    // 1. Render the Application
    const { container, debug } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Click the "edit" button on the booked appointment.
    const appointment = getAllByTestId(
      container,
      "appointment"
    ).find((appointment) => queryByText(appointment, "Archie Cohen"));

    fireEvent.click(queryByAltText(appointment, "Edit"));

    // 4. Check that the form component is shown.
    expect(
      getByPlaceholderText(appointment, "Enter Student Name")
    ).toBeInTheDocument();

    // 5. Change the value of the input for 'name'
    fireEvent.change(getByPlaceholderText(appointment, "Enter Student Name"), {
      target: { value: "Oedipa Maas" },
    });

    // 6. Check that the input updates
    expect(getByDisplayValue(appointment, "Oedipa Maas")).toBeInTheDocument();

    // 7. Select an interviewer
    fireEvent.click(queryByAltText(appointment, "Tori Malcolm"));

    // 8. Check that the interviewer list is updated
    expect(getByText(appointment, "Tori Malcolm")).toBeInTheDocument();

    // 9. Click the save button
    fireEvent.click(queryByText(appointment, "Save"));

    // 10. Check that the 'saving' message is displayed
    expect(getByText(appointment, "Saving ...")).toBeInTheDocument();

    // 11. When the put request is complete, check that the new information is shown
    await waitForElement(() => getByText(appointment, "Oedipa Maas"));
    expect(getByText(appointment, "Oedipa Maas")).toBeInTheDocument();
    expect(getByText(appointment, "Tori Malcolm")).toBeInTheDocument();

    // 12. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining"
    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });
  it("shows the delete error when failing to delete an appointment", async () => {
    axios.delete.mockRejectedValueOnce();
    // 1. Render the Application.
    const { container, debug } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(
      container,
      "appointment"
    ).find((appointment) => queryByText(appointment, "Archie Cohen"));

    fireEvent.click(queryByAltText(appointment, "Delete"));

    // 4. Check that the confirmation message is shown.
    expect(
      getByText(appointment, "Delete the appointment?")
    ).toBeInTheDocument();

    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(queryByText(appointment, "Confirm"));

    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, "Deleting ...")).toBeInTheDocument();

    // 7. Wait until the error message is displayed
    await waitForElement(() =>  getAllByText(appointment.querySelector("h1"), "Error"));

    // 8. Check that the DayListItem with the text "Monday" also has the text "1 spots remaining".
    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();

    // 9. Check that the error message goes away when closed
    fireEvent.click(queryByAltText(appointment, "Close"));
    expect(queryByText(appointment, "Error")).not.toBeInTheDocument();
  });
  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();
    // 1. Render the Application
    const { container, debug } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Click the "edit" button on the booked appointment.
    const appointment = getAllByTestId(
      container,
      "appointment"
    ).find((appointment) => queryByText(appointment, "Archie Cohen"));

    fireEvent.click(queryByAltText(appointment, "Edit"));

    // 4. Check that the form component is shown.
    expect(
      getByPlaceholderText(appointment, "Enter Student Name")
    ).toBeInTheDocument();

    // 5. Change the value of the input for 'name'
    fireEvent.change(getByPlaceholderText(appointment, "Enter Student Name"), {
      target: { value: "Oedipa Maas" },
    });

    // 6. Check that the input updates
    expect(getByDisplayValue(appointment, "Oedipa Maas")).toBeInTheDocument();

    // 7. Select an interviewer
    fireEvent.click(queryByAltText(appointment, "Tori Malcolm"));

    // 8. Check that the interviewer list is updated
    expect(getByText(appointment, "Tori Malcolm")).toBeInTheDocument();

    // 9. Click the save button
    fireEvent.click(queryByText(appointment, "Save"));

    // 10. Check that the 'saving' message is displayed
    expect(getByText(appointment, "Saving ...")).toBeInTheDocument();

    // 11. When the put request is complete, check that the new information is shown
    await waitForElement(() =>  getAllByText(appointment.querySelector("h1"), "Error"));

    // 12. Check that the DayListItem with the text "Monday" also has the text "1 spots remaining"
    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();

    // 13. Check that the error message goes away when closed
    fireEvent.click(queryByAltText(appointment, "Close"));
    expect(queryByText(appointment, "Error")).not.toBeInTheDocument();
  });
});
