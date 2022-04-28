import { useState, useEffect } from "react";
import axios from "axios";

import { updateSpots } from "helpers/selectors";

export default function useApplicationData() {
  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers'),
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    })
  }, []);

  /*function that saves an appointment and updates the api
    takes a number for the appointment id
    takes an object containing student name and interviewer id
  */
  function bookInterview(id, interview) {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const days = state.days.map((day) => {
      if (day.appointments.includes(id)) {
        const existingInterviewCheck = state.appointments[id].interview ? false : true;
        return {...day, spots: existingInterviewCheck ? updateSpots(state, day) - 1 : updateSpots(state,day)}
                                                        //^remove 1 here to book up this spot after adding this booking
      } else {
        return day;
      }
    });

    return axios.put(`/api/appointments/${id}`, {interview})
      .then(res => setState({
        ...state,
        days,
        appointments
      })
    );
  };

  /*
  function that removes an apointment and updates the api
  takes the corresponding interview id
  */
  function cancelInterview(id) {

    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const days = state.days.map((day) => {
      if (day.appointments.includes(id)) {
        return {...day, spots: updateSpots(state, day) + 1} //add 1 here to free up this spot after removing this booking
      } else {
        return day;
      }
    });

    return axios.delete(`/api/appointments/${id}`)
      .then(res => setState({
        ...state,
        days,
        appointments
      })
    );
  };

  return { state, setDay, bookInterview, cancelInterview }
};