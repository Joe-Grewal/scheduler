export function getAppointmentsForDay(state, day) {
  const filteredDay = state.days.filter(appointment => appointment.name === day);
  if (!filteredDay || filteredDay.length === 0) {
    return [];
  } else {
    return filteredDay[0].appointments.map(id => state.appointments[id]);
  }
};

export function getInterviewersForDay(state, day) {
  const filteredDay = state.days.filter(appointment => appointment.name === day);
  if (!filteredDay || filteredDay.length === 0) {
    return [];
  } else {
    return filteredDay[0].interviewers.map(id => state.interviewers[id]);
  }
};

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