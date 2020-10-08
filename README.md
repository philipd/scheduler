# Scheduler Project

Scheduler is a single-page app built with React. Users can create, edit, view, and delete interviews between interviewers and students. It relies on a PostGres database to provide data persistence. It was made as part of the requirements for Lighthouse Labs' Web Development Bootcamp, and utilizes code provided in the curriculum. It is for demonstration purposes only, and comes with no guarantees whatsoever.

## Functionality

Users can view existing interview appointments, organized by weekday and hour. The student (i.e. interviewee) and interviewer are displayed. A photograph of the interviewer is also displayed. The number of available appointment spots for each day is displayed in the sidebar.
There is no user authentication or authorization. Any user accessing the page will have full read/write privileges.
Appointments can be edited by hovering the mouse over an existing appointment and clicking the 'edit' button. The form displayed allows the user to edit the student's name, and to select an interviewer from a list of interviewers who are available that day. This availability cannot be changed through the front-end.
Appointments can be deleted by clicking the 'delete' button. The user is prompted for confirmation before this action is copmleted.
Changes to the database such as put, post, or delete requests will result in the client displaying a animated spinner while the API request completes. Failed requests of these types will result in an error being displayed. Closing the error will return the user to their previous place in the UI.


## Screenshots

!["Example description"](https://github.com/philipd/tweeter/blob/master/docs/desktop.png)

## Dependencies
 - axios: 0.20.0 or better
 - classnames: 2.2.6 or better
 - deepcopy: 2.1.0 or better
 - normalize.css: 8.0.1 or better
 - react: 16.9.0 or better
 - react-dom: 16.9.0 or better
 - react-hooks-testing-library: 0.6.0 or better