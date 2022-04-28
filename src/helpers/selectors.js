//function that gets all appointments for the selected day as an array
export function getAppointmentsForDay(state, day) {
  const filteredDay = state.days.filter(appointment => appointment.name === day);
  if (!filteredDay || filteredDay.length === 0) {
    return [];
  } else {
    return filteredDay[0].appointments.map(id => state.appointments[id]);
  }
};

//function that gets all interviewers for selected day as an array
export function getInterviewersForDay(state, day) {
  const filteredDay = state.days.filter(appointment => appointment.name === day);
  if (!filteredDay || filteredDay.length === 0) {
    return [];
  } else {
    return filteredDay[0].interviewers.map(id => state.interviewers[id]);
  }
};

//function that gets a single interview in the form of an object
export function getInterview(state, interview) {
  if (!interview) {
    return null;
  } else {
    return {
      student: interview.student,
      interviewer: state.interviewers[interview.interviewer]
    } 
  }
};

//function that returns the number of total spots without a current appointment
export function updateSpots (state, day) {
  const specificDay = getAppointmentsForDay(state, state.day);
  let spot = 0;
  for(let i = 0; i < specificDay.length; i++) {
    if (specificDay[i].interview === null) {
      spot += 1;
    } 
  } return spot;
}