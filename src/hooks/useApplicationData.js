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

  function bookInterview(id, interview) {
    console.log(id, interview);

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
        return {...day, spots: updateSpots(state, day) - 1}
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

  function cancelInterview(id) {
    console.log(id);

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
        return {...day, spots: updateSpots(state, day) + 1}
      } else {
        return day;
      }
    });

    return axios.delete(`/api/appointments/${id}`)
      .then(res => console.log(res))
      .then(res => setState({
        ...state,
        days,
        appointments
      })
    );
  };

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers'),
    ]).then((all) => {
      console.log(all);
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    })
  }, []);

  return { state, setDay, bookInterview, cancelInterview }
};